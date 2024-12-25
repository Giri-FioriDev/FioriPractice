sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("demo.controller.fourthview", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf demo.view.fourthview
		 */
		onInit: function() {
			var jsonmodelobject = new sap.ui.model.json.JSONModel({
				data: []
			});

			this.getView().setModel(jsonmodelobject);

			var itemRowObject1 = {
				Userid: "",
				Productid: "",
				Productname: "",
				Productprice: ""
			};
			var itemRowObject2 = {
				Userid: "",
				Productid: "",
				Productname: "",
				Productprice: ""
			};
			var itemRowObject3 = {
				Userid: "",
				Productid: "",
				Productname: "",
				Productprice: ""
			};
			var itemRowObject4 = {
				Userid: "",
				Productid: "",
				Productname: "",
				Productprice: ""
			};
			var itemRowObject5 = {
				Userid: "",
				Productid: "",
				Productname: "",
				Productprice: ""
			};

			var itemDataArray = jsonmodelobject.getProperty("/data");

			itemDataArray.push(itemRowObject1);
			itemDataArray.push(itemRowObject2);
			itemDataArray.push(itemRowObject3);
			itemDataArray.push(itemRowObject4);
			itemDataArray.push(itemRowObject5);

			jsonmodelobject.setData({
				data: itemDataArray
			});
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf demo.view.fourthview
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf demo.view.fourthview
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf demo.view.fourthview
		 */
		//	onExit: function() {
		//
		//	}
		insertheaderitemsEH: function() {
			// Implement Functionality 

			//Capture Header Record from SimpleForm Input Fields

			var userid2 = this.getView().byId("myuserid").getValue();
			var firstname = this.getView().byId("myfname").getValue();
			var lastname = this.getView().byId("mylname").getValue();
			var emailid = this.getView().byId("myemailid").getValue();
			var country = this.getView().byId("mycountry").getValue();
			var salary = this.getView().byId("mysalary").getValue();
			var phone = this.getView().byId("myphone").getValue();

			//Capture Item Records from Table

			var tableo = this.getView().byId("myitemstable");
			var modelo = tableo.getModel();
			var items = tableo.getItems();

			var itemDataArray = [];

			for (var rowindex = 0; rowindex < items.length; rowindex++) {
				var itemrow = items[rowindex].getBindingContext();

				var userid = modelo.getProperty("Userid", itemrow);
				var productid = modelo.getProperty("Productid", itemrow);
				var productname = modelo.getProperty("Productname", itemrow);
				var productprice = modelo.getProperty("Productprice", itemrow);

				itemDataArray.push({
					Userid: userid,
					Productid: productid,
					Productname: productname,
					Productprice: productprice
				});

			}

			//Assign Header Record to DataObject

			var DataObject = {};

			DataObject.Userid = userid2;
			DataObject.Firstname = firstname;
			DataObject.Lastname = lastname;
			DataObject.Emailid = emailid;
			DataObject.Country = country;
			DataObject.Salary = salary;
			DataObject.Phone = phone;

			//Assign Item Records to DataObject.NavigationProperty

			DataObject.NP_ON_USERID = itemDataArray;

			//Create ODataModel for ODataModel Class & Access Odata Service

			var odatamodelo = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/Z9AMHEADERITEMSODATAPROJECT_SRV");

			//call create( ) Front-end method to Execute Create_Deep_Entity( ) method of ODataService
			//configure EntitySet , Pass DataObject(Header+Items) to backend Odata Service
			//if DB Operation is success in backend, Then SuccessCallBack Function is triggered Front-end
			//if DB Operation is failed in backend, Then FailureCallBack Function is triggered Front-end

			odatamodelo.create("/USERHEADERSet", DataObject, {
				success: function() {
					sap.m.MessageBox.success("Header + Items Records Inserted Successfully");
				},
				error: function() {
					sap.m.MessageBox.error("Header + Item Records Not Inserted");

				}
			});

		}

	});

});