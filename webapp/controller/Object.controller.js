/*global location*/
sap.ui.define([
	"demo/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"demo/model/formatter"
], function(
	BaseController,
	JSONModel,
	History,
	formatter
) {
	"use strict";

	return BaseController.extend("demo.controller.Object", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function() {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var iOriginalBusyDelay,
				oViewModel = new JSONModel({
					busy: true,
					delay: 0
				});

			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

			// Store original busy indicator delay, so it can be restored later on
			iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
			this.setModel(oViewModel, "objectView");
			this.getOwnerComponent().getModel().metadataLoaded().then(function() {
				// Restore original busy indicator delay for the object view
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			});

			var odatamodel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMY9PMODATAPROJECT_SRV/");

			this.setModel(odatamodel, "ODATA2");
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Event handler when the share in JAM button has been clicked
		 * @public
		 */
		onShareInJamPress: function() {
			var oViewModel = this.getModel("objectView"),
				oShareDialog = sap.ui.getCore().createComponent({
					name: "sap.collaboration.components.fiori.sharing.dialog",
					settings: {
						object: {
							id: location.href,
							share: oViewModel.getProperty("/shareOnJamTitle")
						}
					}
				});
			oShareDialog.open();
		},

		/**
		 * Event handler  for navigating back.
		 * It there is a history entry or an previous app-to-app navigation we go one step back in the browser history
		 * If not, it will replace the current entry of the browser history with the worklist route.
		 * @public
		 */
		onNavBack: function() {
			var sPreviousHash = History.getInstance().getPreviousHash(),
				oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");

			if (sPreviousHash !== undefined || !oCrossAppNavigator.isInitialNavigation()) {
				history.go(-1);
			} else {
				this.getRouter().navTo("worklist", {}, true);
			}
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched: function(oEvent) {
			var sObjectId = oEvent.getParameter("arguments").objectId;
			this.getModel().metadataLoaded().then(function() {
				var sObjectPath = this.getModel().createKey("EMPSet", {
					Userid: sObjectId
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));
		},

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {string} sObjectPath path to the object to be bound
		 * @private
		 */
		_bindView: function(sObjectPath) {
			var oViewModel = this.getModel("objectView"),
				oDataModel = this.getModel();

			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function() {
						oDataModel.metadataLoaded().then(function() {
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
							oViewModel.setProperty("/busy", true);
						});
					},
					dataReceived: function() {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},

		_onBindingChange: function() {
			var oView = this.getView(),
				oViewModel = this.getModel("objectView"),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("objectNotFound");
				return;
			}

			var oResourceBundle = this.getResourceBundle(),
				oObject = oView.getBindingContext().getObject(),
				sObjectId = oObject.Userid,
				sObjectName = oObject.Firstname;

			// Everything went fine.
			oViewModel.setProperty("/busy", false);
			oViewModel.setProperty("/saveAsTileTitle", oResourceBundle.getText("saveAsTileTitle", [sObjectName]));
			oViewModel.setProperty("/shareOnJamTitle", sObjectName);
			oViewModel.setProperty("/shareSendEmailSubject",
				oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
			oViewModel.setProperty("/shareSendEmailMessage",
				oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
		},
		submitdataEH: function() {
			var userid = this.getView().byId("userid").getValue();
			var fname = this.getView().byId("fname").getValue();
			var lname = this.getView().byId("lname").getValue();
			var emailid = this.getView().byId("emailid").getValue();
			var country = this.getView().byId("country").getValue();
			var salary = this.getView().byId("salary").getValue();
			var mobileno = this.getView().byId("mobileno").getValue();
			var password = this.getView().byId("password").getValue();
			var cbstatus = this.getView().byId("checkbox").getSelected();
			var switchstatus = this.getView().byId("switch").getState();
			var rating = this.getView().byId("rating").getValue();
			var slider = this.getView().byId("slider").getValue();
			var progress = this.getView().byId("progress").getPercentValue();
			var datepicker = this.getView().byId("datepicker").getValue();
			var timepicker = this.getView().byId("timepicker").getValue();
			var textarea = this.getView().byId("textarea").getValue();
			var dropdown = this.getView().byId("dropdown").getSelectedItem().getText();
			var combobox = this.getView().byId("combobox").getSelectedItem().getText();
			var radiobtgroup = this.getView().byId("radiobtgroup").getSelectedButton().getText();
			var multicomboboxitems = this.getView().byId("multicombobox").getSelectedItems();
			var multiinputtokens = this.getView().byId("multiinput").getTokens();

			var multicomboboxarray = [];
			var multiinputarray = [];

			for (var i = 0; i < multicomboboxitems.length; i++) {

				multicomboboxarray.push(multicomboboxitems[i].getText());

			}

			for (var j = 0; j < multiinputtokens.length; j++) {

				multiinputarray.push(multiinputtokens[j].getText());
			}

			var dialog = new sap.m.Dialog({
				title: "User Details",
				content: new sap.m.Text({
					text: " " + "User ID: " + userid + "\n" +
						" " + "Full Name: " + fname + " " + lname + "\n" +
						" " + "Email: " + emailid + "\n" +
						" " + "Country: " + country + "\n" +
						" " + "Salary: " + salary + "\n" +
						" " + "Mobile: " + mobileno + "\n" +
						" " + "Password: " + password + "\n" +
						" " + "CB Status: " + cbstatus + "\n" +
						" " + "Switch Status: " + switchstatus + "\n" +
						" " + "Rating: " + rating + "\n" +
						" " + "Slider Value: " + slider + "\n" +
						" " + "Progress: " + progress + "\n" +
						" " + "Date Picker: " + datepicker + "\n" +
						" " + "Time Picker: " + timepicker + "\n" +
						" " + "Text Area: " + textarea + "\n" +
						" " + "Dropdown: " + dropdown + "\n" +
						" " + "Combo Box: " + combobox + "\n" +
						" " + "Radio Button Group: " + radiobtgroup + "\n" +
						" " + "Multi-Combo Box: " + multicomboboxarray.join(", ") + "\n" +
						" " + "Multi-Input: " + multiinputarray.join(", ")
				}),
				beginButton: new sap.m.Button({
					text: "Close",
					press: function() {
						dialog.close();
					}
				})
			});
			dialog.getContent()[0].addStyleClass("sapUISmallMargin");
			dialog.open();

		},
		editEH: function() {

			//get the Reference of Image Field & use setVisible( ) method as true
			//get the Reference of Input Fields & use setEnabled( ) method as true

			this.getView().byId("image").setVisible(true);

			this.getView().byId("userid").setEnabled(true);
			this.getView().byId("fname").setEnabled(true);
			this.getView().byId("lname").setEnabled(true);
			this.getView().byId("emailid").setEnabled(true);
			this.getView().byId("country").setEnabled(true);
			this.getView().byId("salary").setEnabled(true);
			this.getView().byId("mobileno").setEnabled(true);
			this.getView().byId("password").setEnabled(true);

		},

		getdataEH: function() {
			//Capture Input values from Input Fields of SimpleForm
			//Get the Reference of Output Table
			//Create Filter Object for Filter Class( Provide ODataField, FilterOperator, InputValue )
			//Get the Reference of Table items Aggregation Binding
			//Update Table items Aggregation with Filters

			var country = this.getView().byId("mycountry").getValue();
			var salary = this.getView().byId("mysalary").getValue();

			var tableref = this.getView().byId("mytable");

			var filter1 = new sap.ui.model.Filter("Country", sap.ui.model.FilterOperator.EQ, country);
			var filter2 = new sap.ui.model.Filter("Salary", sap.ui.model.FilterOperator.GT, salary);

			var tableitemsAggregation = tableref.getBinding("items");

			tableitemsAggregation.filter([filter1, filter2]);

		},

		gotothirdviewEH: function() {

			this.getOwnerComponent().getRouter().navTo("thirdview", {}, false);

		},
		gotofourthviewEH: function() {

			this.getOwnerComponent().getRouter().navTo("fourthview", {}, false);

		},
		capturerecordEH: function(oEvent) {
			var listItem = oEvent.getParameter("listItem");

			var selectedrow = listItem.getBindingContext();

			var DataObject = {};

			DataObject.Userid = selectedrow.getProperty("Userid");
			DataObject.Firstname = selectedrow.getProperty("Firstname");
			DataObject.Lastname = selectedrow.getProperty("Lastname");
			DataObject.Emailid = selectedrow.getProperty("Emailid");
			DataObject.Country = selectedrow.getProperty("Country");
			DataObject.Salary = selectedrow.getProperty("Salary");
			DataObject.Phone = selectedrow.getProperty("Phone");

			if (DataObject.Salary > 80000) {
				DataObject.Status = "Experience EMP";
				DataObject.Image = "/greencolor.gif";
				DataObject.CheckBox = true;
				DataObject.Switch = true;
				DataObject.Rating = 4;
				DataObject.Progress = 80;
				DataObject.Slider = 80;

			} else {
				DataObject.Status = "Fresher EMP";
				DataObject.Image = "/redcolor.gif";
				DataObject.CheckBox = false;
				DataObject.Switch = false;
				DataObject.Rating = 2;
				DataObject.Progress = 40;
				DataObject.Slider = 40;
			}

			var jsonmodel = new sap.ui.model.json.JSONModel();

			jsonmodel.setData(DataObject);

			this.getOwnerComponent().setModel(jsonmodel, "JSONMODEL");

			this.gotothirdviewEH();

		},

		fnamevalEH: function() {

			var fname = this.getView().byId("fname").getValue();

			if (fname.length > 5 && fname.length < 12) {
				this.getView().byId("imageindicator1").setSrc("/greencolor.gif");
				this.getView().byId("text1").setText("Firstname is Valid");

			} else {

				this.getView().byId("imageindicator1").setSrc("/redcolor.gif");
				this.getView().byId("text1").setText("Firstname is Not Valid");

			}

		},

		lnamevalEH: function() {

			var lname = this.getView().byId("lname").getValue();

			var regexpression = /^[A-Za-z]+$/;

			if (lname.match(regexpression)) {
				this.getView().byId("imageindicator2").setSrc("/greencolor.gif");
				this.getView().byId("text2").setText("Lastname is Valid");

			} else {

				this.getView().byId("imageindicator2").setSrc("/redcolor.gif");
				this.getView().byId("text2").setText("Lastname is Not Valid");

			}

		},
		emailidvalEH: function() {
			var emailid = this.getView().byId("emailid").getValue();

			var atposition = emailid.indexOf("@");
			var dotposition = emailid.lastIndexOf(".");

			if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= emailid.length) {

				this.getView().byId("imageindicator3").setSrc("/redcolor.gif");
				this.getView().byId("text3").setText("Emailid is Not Valid");

			} else {

				this.getView().byId("imageindicator3").setSrc("/greencolor.gif");
				this.getView().byId("text3").setText("Emailid is Valid");

			}

		},

		countryvalEH: function() {
			var country = this.getView().byId("country").getValue();

			if (country === "INDIA" || country === "US") {
				this.getView().byId("imageindicator4").setSrc("/greencolor.gif");
				this.getView().byId("text4").setText("Country is Valid");

			} else {

				this.getView().byId("imageindicator4").setSrc("/redcolor.gif");
				this.getView().byId("text4").setText("Country is Not Valid");

			}

		},

		salaryvalEH: function() {

			var salary = this.getView().byId("salary").getValue();

			if (isNaN(salary)) {
				this.getView().byId("imageindicator5").setSrc("/redcolor.gif");
				this.getView().byId("text5").setText("Salary is Not Valid");

			} else {

				this.getView().byId("imageindicator5").setSrc("/greencolor.gif");
				this.getView().byId("text5").setText("Salary is Valid");

			}

		},

		mobilevalEH: function() {
			var mobileno = this.getView().byId("mobileno").getValue();

			var regexpression = /^\d{10}$/;

			if (mobileno.match(regexpression)) {

				this.getView().byId("imageindicator6").setSrc("/greencolor.gif");
				this.getView().byId("text6").setText("Mobile Number is Valid");

			} else {

				this.getView().byId("imageindicator6").setSrc("/redcolor.gif");
				this.getView().byId("text6").setText("Mobile Number is Not Valid");

			}

		},

		passwordvalEH: function() {

			var password = this.getView().byId("password").getValue();

			var regexpression = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%&*]).{6,12}$/;

			if (password.match(regexpression)) {

				this.getView().byId("imageindicator7").setSrc("/greencolor.gif");
				this.getView().byId("text7").setText("Password is Valid");

			} else {

				this.getView().byId("imageindicator7").setSrc("/redcolor.gif");
				this.getView().byId("text7").setText("Password is Not Valid");

			}

			this.getView().byId("passwordtext").setText(password);

		},

		enddatevalEH: function() {
			var startdate = this.getView().byId("datepicker").getValue();
			var enddate = this.getView().byId("datepicker2").getValue();

			if (Date.parse(enddate) > Date.parse(startdate)) {

				this.getView().byId("imageindicator8").setSrc("/greencolor.gif");
				this.getView().byId("text8").setText("End Date is Valid");

			} else {

				this.getView().byId("imageindicator8").setSrc("/redcolor.gif");
				this.getView().byId("text8").setText("End Date is Not Valid");

			}

		},

		uploadcompleteEH: function(oEvent) {
			var response = oEvent.getParameter("response");

			if (response) {
				sap.m.MessageBox.success("File Uploaded Successfully");

			}

		},
		fileuploadEH: function() {
			//refresh Security Token
			//Capture Userid input from InputField
			//Get The Reference of FileUploader ScreenElement
			//Create Object for FileUploaderParameter Class & set FileName
			//Create Object for FileUploaderParameter Class  & Set CSRF Token
			//Add FileUploaderParameter1, Add FileUploaderParameter2 to FileUploader 
			//on FileUploader, use setUploadUrl( ) Method & Provide OdataServiceURL
			//on FileUploader, use upload( ) method & To Start FileUpload Process by Executing Create_Stream( )Method

			this.getOwnerComponent().getModel().refreshSecurityToken();

			var useridinput = this.getView().byId("useridinputse").getValue();

			var fileuploader = this.getView().byId("fileuploaderse");

			var fileuploaderparameter1 = new sap.ui.unified.FileUploaderParameter({
				name: "slug",
				value: fileuploader.getValue()
			});

			var fileuploaderparameter2 = new sap.ui.unified.FileUploaderParameter({
				name: "x-csrf-token",
				value: this.getOwnerComponent().getModel().getHeaders()['x-csrf-token']
			});

			fileuploader.addHeaderParameter(fileuploaderparameter1);
			fileuploader.addHeaderParameter(fileuploaderparameter2);

			fileuploader.setUploadUrl("/sap/opu/odata/SAP/ZNEWFILESPROJECT_SRV/UserSet('" + useridinput + "')/NP_ON_USERID");

			fileuploader.upload();

		},
		filedownloadEH: function() {

			//Capture Userid Input from Input Field
			//Construct OData Service URL
			//Use URLHelperClass with redirect method and pass ODataService FileContent URL

			var useridinput = this.getView().byId("useridinputse").getValue();

			var filecontentsurl = "/sap/opu/odata/SAP/ZNEWFILESPROJECT_SRV/FileSet('" + useridinput + "')/$value";

			sap.m.URLHelper.redirect(filecontentsurl, true);
		},

		filepreviewEH: function() {
			//capture Userid Input From Input Field
			//Get The Reference of SimpleForm container for FilePreview
			//Create ODataModel for ODataModel Class & provide ODataService URL
			//on ODataModel, use read( ) method To Execute Get_Stream( ) Method of OData Service

			var useridinput = this.getView().byId("useridinputse").getValue();

			var myform = this.getView().byId("myform");

			var odatamodel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZNEWFILESPROJECT_SRV/");

			odatamodel.read("/FileSet('" + useridinput + "')/$value", null, null, true,

				function(oData, oResponse) {
					var filecontenturl = oResponse.requestUri;

					var htmlo = new sap.ui.core.HTML();

					htmlo.setContent("<IFrame src=" + filecontenturl + " width='450px'  height='450px'/>");

					myform.addContent(htmlo);
				});

		}

	});

});