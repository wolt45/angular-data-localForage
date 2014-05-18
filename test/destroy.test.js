describe('DSLocalForageAdapter.destroy(resourceConfig, id, options)', function () {
	it('should destroy an item from localStorage', function (done) {
		var path = DSUtils.makePath('api', 'posts', 1);

		localforage.setItem(path, p1)
			.then(function () {
				return localforage.getItem(path);
			})
			.then(function (item) {
				assert.deepEqual(item, p1, 'p1 should be in localforage');

				$rootScope.$apply();

				return DSLocalForageAdapter.destroy({
					baseUrl: 'api',
					endpoint: 'posts'
				}, 1);
			})
			.then(function () {
				return localforage.getItem(path);
			})
			.then(function (item) {
				assert.isNull(item, 'the item should be gone from localStorage');

				path = DSUtils.makePath('api2', 'posts', 1);
				return localforage.setItem(path, p2);
			})
			.then(function () {
				return localforage.getItem(path);
			})
			.then(function (item) {
				assert.deepEqual(item, p2, 'p2 should be in localforage');
				$rootScope.$apply();
				return DSLocalForageAdapter.destroy({
					baseUrl: 'api',
					endpoint: 'posts'
				}, 1, { baseUrl: 'api2' });
			})
			.then(function () {
				return localforage.getItem(path);
			})
			.then(function (item) {
				assert.isNull(item, 'the item should be gone from localStorage');
				done();
			})
			.catch(function (err) {
				console.error(err.stack);
				fail('should not have rejected');
			});

		$rootScope.$apply();
	});
});
