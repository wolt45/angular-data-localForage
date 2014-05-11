// Setup global test variables
var $rootScope, $q, $log, DSProvider, DS, app, $httpBackend, p1, p2, p3, p4, p5;

// Helper globals
var fail = function (msg) {
		assert.equal('should not reach this!: ' + msg, 'failure');
	},
	TYPES_EXCEPT_STRING = [123, 123.123, null, undefined, {}, [], true, false, function () {
	}],
	TYPES_EXCEPT_STRING_OR_ARRAY = [123, 123.123, null, undefined, {}, true, false, function () {
	}],
	TYPES_EXCEPT_STRING_OR_OBJECT = [123, 123.123, null, undefined, [], true, false, function () {
	}],
	TYPES_EXCEPT_ARRAY = ['string', 123, 123.123, null, undefined, {}, true, false, function () {
	}],
	TYPES_EXCEPT_STRING_OR_NUMBER = [null, undefined, {}, [], true, false, function () {
	}],
	TYPES_EXCEPT_STRING_OR_ARRAY_OR_NUMBER = [null, undefined, {}, true, false, function () {
	}],
	TYPES_EXCEPT_NUMBER = ['string', null, undefined, {}, [], true, false, function () {
	}],
	TYPES_EXCEPT_OBJECT = ['string', 123, 123.123, null, undefined, true, false, function () {
	}],
	TYPES_EXCEPT_BOOLEAN = ['string', 123, 123.123, null, undefined, {}, [], function () {
	}],
	TYPES_EXCEPT_FUNCTION = ['string', 123, 123.123, null, undefined, {}, [], true, false];

angular.module('app', ['ng', 'angular-data.DS']);

// Setup before each test
beforeEach(function (done) {
	module('app', function (_DSProvider_) {
		DSProvider = _DSProvider_;
	});
	inject(function (_$rootScope_, _$q_, _$httpBackend_, _DS_, _$log_) {
		// Setup global mocks
		$q = _$q_;
		$rootScope = _$rootScope_;
		DS = _DS_;
		$httpBackend = _$httpBackend_;
		DS.defineResource({
			name: 'post',
			endpoint: '/posts'
		});
		$log = _$log_;
	});

	p1 = { author: 'John', age: 30, id: 5 };
	p2 = { author: 'Sally', age: 31, id: 6 };
	p3 = { author: 'Mike', age: 32, id: 7 };
	p4 = { author: 'Adam', age: 33, id: 8 };
	p5 = { author: 'Adam', age: 33, id: 9 };

	done();
});

// Clean up after each test
afterEach(function () {
	$httpBackend.verifyNoOutstandingExpectation();
	$httpBackend.verifyNoOutstandingRequest();
	$log.reset();
});
