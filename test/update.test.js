describe('DSLocalForageAdapter.update(resourceConfig, id, options)', function () {
	it('should update an item in localforage', function (done) {
		var path = DSUtils.makePath('api', 'posts', 1);

		localforage.setItem(path, p1)
			.then(function () {
				return localforage.getItem(path);
			})
			.then(function (item) {
				assert.deepEqual(item, p1, 'p1 should be in localforage');

				$rootScope.$apply();

				return DSLocalForageAdapter.update({
					baseUrl: 'api',
					endpoint: 'posts'
				}, 1, { age: 99 });
			})
			.then(function (item) {
				assert.deepEqual(item, { author: 'John', id: 5, age: 99 }, 'the item should have been updated');
				return localforage.getItem(path);
			})
			.then(function (item) {
				assert.deepEqual(item, { author: 'John', id: 5, age: 99 }, 'the item should have been updated');

				path = DSUtils.makePath('api2', 'posts', 1);
				return localforage.setItem(path, p2);
			})
			.then(function () {
				return localforage.getItem(path);
			})
			.then(function (item) {
				assert.deepEqual(item, p2, 'p2 should be in localforage');
				$rootScope.$apply();
				return DSLocalForageAdapter.update({
					baseUrl: 'api',
					endpoint: 'posts'
				}, 1, { author: 'Beth' }, { baseUrl: 'api2' });
			})
			.then(function (item) {
				assert.deepEqual(item, { author: 'Beth', id: 6, age: 31 }, 'the item should have been updated');
				return localforage.getItem(path);
			})
			.then(function (item) {
				assert.deepEqual(item, { author: 'Beth', id: 6, age: 31 }, 'the item should have been updated');
				done();
			})
			.catch(function (err) {
				console.error(err.stack);
				fail('should not have rejected');
			});

		$rootScope.$apply();
	});
});
