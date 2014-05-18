/**
 * @author Jason Dobry <jason.dobry@gmail.com>
 * @file angular-data-localforage.js
 * @version <%= pkg.version %> - Homepage <https://github.com/jmdobry/angular-data-localForage/>
 * @copyright (c) 2014 Jason Dobry <https://github.com/jmdobry/>
 * @license MIT <https://github.com/jmdobry/angular-data-localForage/blob/master/LICENSE>
 *
 * @overview localforage adapter for angular-data.
 */
(function (window, angular, localforage, undefined) {
	'use strict';

	localforage.config({
		name: 'DS'
	});

	/**
	 * @doc function
	 * @id DSLocalForageAdapterProvider
	 * @name DSLocalForageAdapterProvider
	 */
	function DSLocalForageAdapterProvider() {

		this.$get = ['DSUtils', function (DSUtils) {

			/**
			 * @doc interface
			 * @id DSLocalForageAdapter
			 * @name DSLocalForageAdapter
			 * @description
			 * Default adapter used by angular-data. This adapter uses AJAX and JSON to send/retrieve data to/from a server.
			 * Developers may provide custom adapters that implement the adapter interface.
			 */
			return {
				/**
				 * @doc method
				 * @id DSLocalForageAdapter.methods:find
				 * @name find
				 * @description
				 * Retrieve a single entity from localforage.
				 *
				 * @param {object} resourceConfig Properties:
				 * - `{string}` - `baseUrl` - Base url.
				 * - `{string=}` - `namespace` - Namespace path for the resource.
				 * @param {string|number} id The primary key of the entity to retrieve.
				 * @returns {Promise} Promise.
				 */
				find: find,

				/**
				 * @doc method
				 * @id DSLocalForageAdapter.methods:findAll
				 * @name findAll
				 * @description
				 * Not supported.
				 */
				findAll: function () {
					throw new Error('Not supported!');
				},

				/**
				 * @doc method
				 * @id DSLocalForageAdapter.methods:create
				 * @name create
				 * @description
				 * Not supported.
				 */
				create: function () {
					throw new Error('Not supported!');
				},

				/**
				 * @doc method
				 * @id DSLocalForageAdapter.methods:update
				 * @name update
				 * @description
				 * Update an entity in localforage.
				 *
				 * @param {object} resourceConfig Properties:
				 * - `{string}` - `baseUrl` - Base url.
				 * - `{string=}` - `namespace` - Namespace path for the resource.
				 * @param {string|number} id The primary key of the entity to update.
				 * @param {object} attrs The attributes with which to update the entity.
				 * @returns {Promise} Promise.
				 */
				update: update,

				/**
				 * @doc method
				 * @id DSLocalForageAdapter.methods:updateAll
				 * @name updateAll
				 * @description
				 * Not supported.
				 */
				updateAll: function () {
					throw new Error('Not supported!');
				},

				/**
				 * @doc method
				 * @id DSLocalForageAdapter.methods:destroy
				 * @name destroy
				 * @description
				 * Remove an entity in localforage.
				 *
				 * @param {object} resourceConfig Properties:
				 * - `{string}` - `baseUrl` - Base url.
				 * - `{string=}` - `namespace` - Namespace path for the resource.
				 * @param {string|number} id The primary key of the entity to destroy.
				 * @returns {Promise} Promise.
				 */
				destroy: destroy,

				/**
				 * @doc method
				 * @id DSLocalForageAdapter.methods:destroyAll
				 * @name destroyAll
				 * @description
				 * Not supported.
				 */
				destroyAll: function () {
					throw new Error('Not supported!');
				}
			};

			function GET(key, successCallback) {
				return localforage.getItem(key, successCallback);
			}

			function PUT(key, value, successCallback) {
				return localforage.getItem(key)
					.then(function (item) {
						if (item) {
							DSUtils.deepMixIn(item, value);
							return localforage.setItem(key, item, successCallback);
						} else {
							return localforage.setItem(key, value, successCallback);
						}
					});
			}

			function DEL(key, successCallback) {
				return localforage.removeItem(key, successCallback);
			}

			function find(resourceConfig, id, options) {
				options = options || {};
				return GET(
					DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.endpoint, id)
				);
			}

			function update(resourceConfig, id, attrs, options) {
				options = options || {};
				return PUT(
					DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.endpoint, id),
					attrs
				).then(function () {
						return GET(DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.endpoint, id));
					});
			}

			function destroy(resourceConfig, id, options) {
				options = options || {};
				return DEL(
					DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.endpoint, id)
				);
			}
		}];
	}

	angular.module('angular-data.DS').provider('DSLocalForageAdapter', DSLocalForageAdapterProvider);

})(window, window.angular, window.localforage);
