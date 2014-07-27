/**
* Notifications Module
*
* To Use:
*
* Add a script tag for this file, as well as for angular-ui bootstrap
* Add a dependency for 'angular.boostrap.notifications' to your angular module
* Add <div data-notifications></div> to your index.html file
*
* Include notifications as a dependency in a controller/directive/factory
*
* Add notifications:
*   notifications.add({
*     text: 'text to show',                //Text of the notification
*     type: 'info',                        //Type of notification
*     autoClear: 1000,                     //Optional: milliseconds until notification auto clears
*     task: someMethod(notification) {},   //Optional: some task to be executed
*     interval: 1000,                       //Optional: if task is to repeat, give milliseconds
*     count: 10,                           //Optional: max times to run task (0, or undefined is infinite)
*     closeable: false,                    //Optional: notification closeable? Defaults to true
*     data: data                           //Optional: the object can hold any other data
*   });
*/
angular.module('angular.bootstrap.notifications', ['ui.bootstrap'])
.directive('notifications',
 function ($rootScope) {
   'use strict';

   //We want to use the root scope to enable passing global notifications
   $rootScope.$$notifications = $rootScope.$$notifications || [];

   function link (scope) {
     //Set the controller's $scope.notifications
     scope.notifications = $rootScope.$$notifications;
   }

   return {
      restrict: 'AE',
      link: link,
      templateUrl: 'angular/boostrap/notification/notification.html',
      controller: 'notificationsCtrl'
   };
 }
)
.controller('notificationsCtrl',
 function ($scope, $rootScope, $timeout, $interval) {
   'use strict';

   //Watch for a method to return false (after returning true), then clear the notifications
   $rootScope.$watch('$notificationsClearWhenFalseMethod()', function (newValue, oldValue) {
     if(!newValue && oldValue) {
       _.remove($scope.notifications, function (notification) {
         $interval.cancel(notification.$$interval);
         return true;
       });
     }
   });

   //Watch for a value to become false (after being true), then clearn the notifications
   $rootScope.$watch('$notificationsClearWhenFalseValue', function (newValue, oldValue) {
    if(!newValue && oldValue) {
      _.remove($scope.notifications, function (notification) {
        $interval.cancel(notification.$$interval);
        return true;
      });
    }
   });

   //Watch for new notifictions
   $scope.$watch('notifications', function () {
     //Step through the notifications
     _.each($scope.notifications, function (notification) {
       if(notification.task) {
         if(notification.interval) {
           //If the notification has a task, and interval, set the task to run
           // at the interval
           if(!notification.$$interval){
             notification.$$interval = $interval(function () {
               notification.task(notification);
             }, notification.interval, notification.count);
           }
         } else {
           //If the notification only has a task, run the task one time
           notification.task(notification);
           delete notification.task;
         }
       }

       //If the notification should be auto cleared, set a timeout to clear
       if(notification.autoClear) {
         $timeout(function () {
           $scope.clearNotification(notification);
         }, notification.autoClear);
       }
     });
   }, true);

   $scope.classes = function (notification) {
     var classes = 'alert-' + notification.type;

     if(typeof notification.closeable === 'boolean' && !notification.closeable) {
       classes += ' notcloseable';
     }

     return classes;
   };

   /**
    * Splices out the notification
    */
   $scope.clearNotification = function (notification) {
     $interval.cancel(notification.$$interval);
     _.remove($scope.notifications, function (item) {
       return item.$$id === notification.$$id;
     });
   };
 }
)
.factory('notifications',
 function ($rootScope) {
   'use strict';

   //Add notification to the array of notifications
   function addNotification (notification) {
     notification.$$id = guid();
     $rootScope.$$notifications = $rootScope.$$notifications || [];
     $rootScope.$$notifications.push(notification);
   }

   //Method creates a GUID -- used to give each notification a unique ID
   function guid () {
     var s = [];
     var hexDigits = '0123456789abcdef';

     for (var i = 0; i < 36; i++) {
         s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
     }

     s[14] = '4';  // bits 12-15 of the time_hi_and_version field to 0010
     s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
     s[8] = s[13] = s[18] = s[23] = '-';

     return s.join('');
    }

   return {
     add: addNotification
   };
 }
)
.run(function ($templateCache) {
 'use strict';

 $templateCache.put('angular/boostrap/notification/notification.html',
   '<style>.notification-center .notcloseable button{visibility: hidden}' +
   '.notification-center{position: fixed; bottom: 0px; right: 20px; width: 300px;}' +
   '.alert-info{opacity: .9;}</style>' +
   '<div class="notification-center">' +
   '<div data-alert class="{{classes(notification)}}" data-ng-repeat="notification in notifications"' +
   ' type="{{notification.type}}" data-close="clearNotification(notification)">' +
   '{{notification.text}}</div></div>'
   );
});
