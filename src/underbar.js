/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (n === undefined) return array[0];
    return array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    array = array.reverse();
    if (n === undefined) return array[0];
    return array.slice(0, n).reverse();
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var prop in collection) {
        iterator(collection[prop], prop, collection); 
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    //looks cleaner without the each function
    for (var i = 0; i < array.length; i++) {
      if (array[i] === target) return i;
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var results = [];
    _.each(collection, function(value) {
      if (iterator(value)) results.push(value);
    });
    return results;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(value) {
      return !iterator(value); 
      //ALTERNATIVE:
      //return !iterator.call(context, value); 
        //how exactly does call and context work??
        //call allows you to call method on behalf of another object
    }); 
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var unique = [];
    _.each(array, function(value) {
      if (_.indexOf(unique, value) === -1) unique.push(value);
    });
    return unique;
  };

  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results = [];
    _.each(array, function(value, key) {
      results.push(iterator(value, key));
    });
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    //test if it is a function
    return _.map(list, function(value) {
      //need bracket syntax b/c methodName is a string
      //[(any Array)]["sort"].call([3,2,1]) is equivalent to [3,2,1].sort()
      //call takes arg list, while apply takes arg array
      //must use object 
      return (typeof methodName === "function" ? methodName : value[methodName]).call(value, args);
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {
    var total;
    if (arguments[2] !== undefined) total = initialValue;
    _.each(collection, function(value) {
      total = (total === undefined ? value : iterator(total, value));
    });
    return total;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    // was found is "total", it changes to true once the item is found and breaks out of the function, starts as false
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) return true;
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    var iteratorExists = (arguments[1] !== undefined)
    return _.reduce(collection, function(match, item) {
      //if false, continue returning false until finished looping
      if (!match) return false;
      //tests if it passes a truth test (including 1)
      return ( iteratorExists ? !!(iterator(item) == true) : !!item )
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    // start value is false, searching for true. Only thing I can borrow is the truth test

    // if (arguments[1] === undefined) {
    //   iterator = function(item) { return item; };
    // }
    // var match = false;
    // return _.each(collection, function(value) {
    //   if (_.every(value, iterator) === true) {
    //     match = true;
    //   }
    // })
    // return match;

    //with reduce
    var iteratorExists = (arguments[1] !== undefined)
    return _.reduce(collection, function(match, item) {
      if (match) return true;
      return ( iteratorExists ? !!(iterator(item)) == true : !!item )
    }, false);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var objects =  Array.prototype.slice.call(arguments, 1); //get all added objects
    //can't use slice directly on arguments
    //it is not an array, it is an array-like object
    //http://stackoverflow.com/questions/7056925/how-does-array-prototype-slice-call-work
    _.each(objects, function(object) { 
      _.each(object, function(value, prop) { 
        obj[prop] = value;
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var objects =  Array.prototype.slice.call(arguments, 1);
    _.each(objects, function(object) {
      _.each(object, function(value, prop) {
        if (obj[prop] === undefined) obj[prop] = value;
      });
    });
    return obj;
  };

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    //for recursive functions
    //stores the recursive values as they are calculated
    // http://my.safaribooksonline.com/book/programming/javascript/9780596517748/functions/memoization
    var results = {}; // store results
    //how do I retrieve the argument from func
    return function() { 
      var arg = Array.prototype.slice.call(arguments); //*but the function directly above does not have any arguments???
      //test if value has already been calculated. if not, calculated the value
      if (results[arg] === undefined) results[arg] = func(arg);
      return results[arg];
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    // why does this work once it is wrapped in another function?? 
    // why null?
    setTimeout(function() { return func.apply(null, args); }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
    var randomized = {};
    var randomNumbers = [];
    var shuffledArray = [];
    //assign random number to each value
    _.each(array, function(value) { 
      var random = Math.random()
      randomized[random] = value;
      randomNumbers.push(random);
    });
    randomNumbers.sort(function(a,b){return a-b;});
    //find the associated values
    _.each(randomNumbers, function(key) { 
      shuffledArray.push(randomized[key]);
    });
    return shuffledArray;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var sortedCollection = [];
    var iteratorResults = [];
    var resultHash = {};

    //pair iteratorResults to each value in collection
    _.each(collection, function(value) {
      var result = (typeof(iterator) === "string" ? value[iterator] : iterator(value));
      iteratorResults.push(result);
      if (!resultHash[result]) resultHash[result] = [];
      resultHash[result].push(value);
    });

    //sort the unique iteratorResults
    iteratorResults = _.uniq(iteratorResults).sort(function(a,b){return a-b;});
    
    //return the associated properties of each iterator result
    //manually because _.flatten hasn't been invented yet...
    _.each(iteratorResults, function(result) {
      _.each(resultHash[result], function(value) {
        sortedCollection.push(value);
      });
    });

    return sortedCollection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var arrays = arguments;
    var zippedArrays = [];
    var maxIndex = arrays[0].length - 1;

    _.each(arrays, function(array) {
      for (var index = 0; index <= maxIndex; index++) {
        if (!zippedArrays[index]) zippedArrays[index] = [];
        zippedArrays[index].push(array[index]);
      }
    })
    return zippedArrays;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var flattenedArray = [];
    var arraySearch = function(array) {
      _.each(array, function(value) {
        Array.isArray(value) ? arraySearch(value) : flattenedArray.push(value);
      })
    }
    arraySearch(nestedArray);
    return flattenedArray;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var seenValues = arguments[0];
    var comparisonArrays = Array.prototype.slice.call(arguments, 1);
    _.each(comparisonArrays, function(comparisonArray) {
      // filter seenValues for just the items that match any comparisonArray value
      seenValues = _.filter(seenValues, function(seenValue) {
        return _.some(comparisonArray, function(comparisonValue) {
          return seenValue === comparisonValue;
        });
      });
    });
    return seenValues;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var originalArray = arguments[0];
    var comparisonArrays = Array.prototype.slice.call(arguments, 1);
    _.each(comparisonArrays, function(comparisonArray) {
      // filter originalArray for just the values that do not match in the comparison arrays
      originalArray = _.filter(originalArray, function(originalValue) {
        return _.every(comparisonArray, function(comparisonValue) {
          return originalValue !== comparisonValue;
        });
      });
    });
    return originalArray;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    var queue = 0;
    var firstInQueue = true;
    var result;

    var callFunction = function() {
      queue--;
      setTimeout(testNextInQueue, wait);
      result = func();
    }

    var testNextInQueue = function() {
      if (queue > 0) callFunction();
      if (queue === 0) firstInQueue = true;
    }

    return function() {
      queue++;
      if (firstInQueue) {
        firstInQueue = false;
        callFunction();
      }
      // if function cannot be called yet, returns previous value
      return result;
    }
  };

}).call(this);
