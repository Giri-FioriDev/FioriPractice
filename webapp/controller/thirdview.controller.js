sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller,	History) {

	"use strict";

	return Controller.extend("demo.controller.thirdview", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf demo.view.thirdview
		 */
		onInit: function() {
			// This is a oninit life cycle function.
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf demo.view.thirdview
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf demo.view.thirdview
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf demo.view.thirdview
		 */
		//	onExit: function() {
		//
		//	}

		gotoobjectviewEH: function() {

			this.getOwnerComponent().getRouter().navTo("object", {
				objectId: "1001"
			}, true);

		},
		insertdataEH: function() {

			var DataObject = {};

			DataObject.Userid = this.getView().byId("myuserid").getValue();
			DataObject.Firstname = this.getView().byId("myfname").getValue();
			DataObject.Lastname = this.getView().byId("mylname").getValue();
			DataObject.Emailid = this.getView().byId("myemailid").getValue();
			DataObject.Country = this.getView().byId("mycountry").getValue();
			DataObject.Salary = this.getView().byId("mysalary").getValue();
			DataObject.Phone = this.getView().byId("myphone").getValue();

			var odatamodel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/Z8AM_CRUD_ODATAPROJECT_SRV");

			odatamodel.create("/EMPSet", DataObject, null,

				function(oResponse) {
					sap.m.MessageBox.success("Record Inserted Successfully");
				},
				function() {
					sap.m.MessageBox.error("Record Not Inserted");

				});

			this.getOwnerComponent().getModel().refresh(true);

		},

		updatedataEH: function() {

			var DataObject = {};

			DataObject.Userid = this.getView().byId("myuserid").getValue();
			DataObject.Firstname = this.getView().byId("myfname").getValue();
			DataObject.Lastname = this.getView().byId("mylname").getValue();
			DataObject.Emailid = this.getView().byId("myemailid").getValue();
			DataObject.Country = this.getView().byId("mycountry").getValue();
			DataObject.Salary = this.getView().byId("mysalary").getValue();
			DataObject.Phone = this.getView().byId("myphone").getValue();

			var odatamodel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/Z8AM_CRUD_ODATAPROJECT_SRV");

			odatamodel.update("/EMPSet('" + DataObject.Userid + "')", DataObject, null,

				function(oResponse) {
					sap.m.MessageBox.success("Record Updated Successfully");
				},
				function() {
					sap.m.MessageBox.error("Record Not Updated");

				});

			this.getOwnerComponent().getModel().refresh(true);

		},

		deletedataEH: function() {
			var DataObject = {};

			DataObject.Userid = this.getView().byId("myuserid").getValue();

			var odatamodel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/Z8AM_CRUD_ODATAPROJECT_SRV");

			odatamodel.remove("/EMPSet('" + DataObject.Userid + "')", null,

				function(oResponse) {
					sap.m.MessageBox.success("Record Deleted Successfully");
				},
				function() {
					sap.m.MessageBox.error("Record Not Deleted");

				});

			this.getOwnerComponent().getModel().refresh(true);

		},
		onNavBack: function() {
			var sPreviousHash = History.getInstance().getPreviousHash(),
				oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");

			if (sPreviousHash !== undefined || !oCrossAppNavigator.isInitialNavigation()) {
				history.go(-1);
			} else {
				this.getRouter().navTo("worklist", {}, true);
			}
		},

	});

});