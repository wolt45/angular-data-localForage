(function (window, angular, undefined) {

	localforage.config({
		name: 'DS'
	});

	/**
	 * @doc function
	 * @id DSLocalForageAdapterProvider
	 * @name DSLocalForageAdapterProvider
	 */
	function DSLocalForageAdapterProvider() {

		this.$get = ['$http', '$log', 'DSUtils', function ($http, $log, DSUtils) {

			/**
			 * @doc property
			 * @id DSLocalForageAdapterProvider.properties:defaults
			 * @name defaults
			 * @description
			 * Default configuration for this adapter.
			 *
			 * Properties:
			 *
			 * - `{function}` - `serialize` - See [the guide](/documentation/guide/adapters/index). Default: No-op.
			 * - `{function}` - `deserialize` - See [the guide](/documentation/guide/adapters/index). Default: No-op.
			 * - `{function}` - `queryTransform` - See [the guide](/documentation/guide/adapters/index). Default: No-op.
			 */
			var defaults = this.defaults = {
				/**
				 * @doc property
				 * @id DSLocalForageAdapterProvider.properties:defaults.serialize
				 * @name defaults.serialize
				 * @description
				 * Your server might expect a custom request object rather than the POJO payload. Use `serialize` to
				 * create your custom request object.
				 *
				 * @param {object} data Data to be sent to the server.
				 * @returns {*} Returns `data` as-is.
				 */
				serialize: function (data) {
					return data;
				},

				/**
				 * @doc property
				 * @id DSLocalForageAdapterProvider.properties:defaults.deserialize
				 * @name defaults.deserialize
				 * @description
				 * Your server might return a custom response object instead of the plain POJO payload. Use `deserialize` to
				 * pull the payload out of your response object so angular-data can use it.
				 *
				 * @param {object} data Response object from `$http()`.
				 * @returns {*} Returns `data.data`.
				 */
				deserialize: function (data) {
					return data.data;
				},

				/**
				 * @doc property
				 * @id DSLocalForageAdapterProvider.properties:defaults.queryTransform
				 * @name defaults.queryTransform
				 * @description
				 * Transform the angular-data query to something your server understands. You might just do this on the server instead.
				 *
				 * @param {object} query Response object from `$http()`.
				 * @returns {*} Returns `query` as-is.
				 */
				queryTransform: function (query) {
					return query;
				}
			};

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
				 * @doc property
				 * @id DSLocalForageAdapter.properties:defaults
				 * @name defaults
				 * @description
				 * Reference to [DSLocalForageAdapterProvider.defaults](/documentation/api/api/DSLocalForageAdapterProvider.properties:defaults).
				 */
				defaults: defaults,

				/**
				 * @doc method
				 * @id DSLocalForageAdapter.methods:HTTP
				 * @name HTTP
				 * @description
				 * Not supported.
				 */
				HTTP: function () {
					throw new Error('Not supported!');
				},

				/**
				 * @doc method
				 * @id DSLocalForageAdapter.methods:GET
				 * @name GET
				 * @description
				 *  Wrapper for `localforage.getItem()`.
				 *
				 * ## Signature:
				 * ```js
				 * DS.DEL(key[, successCallback])
				 * ```
				 *
				 * ## Example:
				 *
				 * ```js
				 * Works the same as localforage.getItem
				 * ```
				 *
				 * @param {string} key The key of the item to remove.
				 * @param {function=} successCallback Callback function.
				 * @returns {Promise} Promise.
				 */
				GET: GET,

				/**
				 * @doc method
				 * @id DSLocalForageAdapter.methods:POST
				 * @name POST
				 * @description
				 * Not supported.
				 */
				POST: function () {
					throw new Error('Not supported!');
				},

				/**
				 * @doc method
				 * @id DSLocalForageAdapter.methods:PUT
				 * @name PUT
				 * @description
				 * Wrapper for `localforage.setItem()`.
				 *
				 * ## Signature:
				 * ```js
				 * DS.PUT(key, value[, successCallback])
				 * ```
				 *
				 * ## Example:
				 *
				 * ```js
				 * Works the same as localforage.setItem()
				 * ```
				 *
				 * @param {string} key The key of the item to save.
				 * @param {object=} value Value to save.
				 * @param {function=} successCallback Callback function.
				 * @returns {Promise} Promise.
				 */
				PUT: PUT,

				/**
				 * @doc method
				 * @id DSLocalForageAdapter.methods:DEL
				 * @name DEL
				 * @description
				 * Wrapper for `localforage.removeItem()`.
				 *
				 * ## Signature:
				 * ```js
				 * DS.DEL(key[, successCallback])
				 * ```
				 *
				 * ## Example:
				 *
				 * ```js
				 * Works the same as localforage.removeItem
				 * ```
				 *
				 * @param {string} key The key of the item to remove.
				 * @param {function=} successCallback Callback function.
				 * @returns {Promise} Promise.
				 */
				DEL: DEL,

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
				 * @id DSLocalForageAdapter.methods:createMany
				 * @name createMany
				 * @description
				 * Not supported.
				 */
				createMany: function () {
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
				 * @id DSLocalForageAdapter.methods:updateMany
				 * @name updateMany
				 * @description
				 * Not supported.
				 */
				updateMany: function () {
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
				return localforage.setItem(key, value, successCallback);
			}

			function DEL(key, successCallback) {
				return localforage.removeItem(key, successCallback);
			}

			function find(resourceConfig, id) {
				return this.GET(
					DSUtils.makePath(resourceConfig.baseUrl, resourceConfig.endpoint, id)
				);
			}

			function update(resourceConfig, id, attrs) {
				return this.PUT(
					DSUtils.makePath(resourceConfig.baseUrl, resourceConfig.endpoint, id),
					defaults.serialize(attrs)
				);
			}

			function destroy(resourceConfig, id) {
				return this.DEL(
					DSUtils.makePath(resourceConfig.baseUrl, resourceConfig.endpoint, id)
				);
			}
		}];
	}

	angular.module('angular-data.DS').provider('DSLocalForageAdapter', DSLocalForageAdapterProvider);

})(window, window.angular);
