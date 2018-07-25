/// <reference path="js/jquery-2.0.0.min.js" />
/// <reference path="js/knockout-3.4.0.js" />

var ViewModel = function () {
    var self = this,
            updating = false;

        self.Id = ko.observable();
        self.ForeName = ko.observable();
        self.SurName = ko.observable();
        self.Email = ko.observable();
        self.CreatedDate = ko.observable();

        self.update = function (ForeName, SurName, Email, CreatedDate) {
            updating = true;
            self.Id = ko.observable();
            self.ForeName(ForeName);
            self.SurName(SurName);
            self.Email(Email);
            self.CreatedDate(CreatedDate);
            updating = false;
        };
      self.userList = ko.observableArray([]);

self.update = function (title, finished) {
            updating = true;
            self.title(title);
            self.finished(finished);
            updating = false;
        };

 self.add = function (item) {
       var oldItem = ko.utils.arrayFirst(self.userList(), function (i) { return i.id === item.id; });
        if (!oldItem) {
                    self.userList.push(item);
                }
                else{
                    self.userList.remove(function (i) { return i.id === item.id; });
                    self.userList.push(item);
                }
    };

    self.update = function (Id, ForeName, SurName, Email, CreatedDate) {
        var oldItem = ko.utils.arrayFirst(self.userList(), function (i) { return i.id === id; });
        if (oldItem) {
            oldItem.update(Id, ForeName, SurName, Email, CreatedDate);
        }
    };
    
    self.sendGet = function () {
        $.ajax({
            url: "/api/user/list",
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (items) {
                  $.each(items, function (idx, item) {
                        self.add(item);
                    });
                    self.cancel();
             }
        });
       
    };

    //Add new User  
    self.addNewUser = function addNewUser(newUser) {

        var UserObject = {
            Id: self.Id(),
            ForeName: self.ForeName(),
            SurName: self.SurName(),
            Email: self.Email(),
            CreatedDate: self.CreatedDate()
        };
        $.ajax({
            url: "/api/user/",
            type: "POST",
            data: JSON.stringify(UserObject),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                 
                 self.sendGet();
             }
        });
       
        
    };

 //Update User  
    self.updateUser = function () {

        var UserObject = {
            Id: self.Id(),
            ForeName: self.ForeName(),
            SurName: self.SurName(),
            Email: self.Email(),
            CreatedDate: self.CreatedDate()
        };
         $.ajax({
            url: "/api/user",
            type: "PUT",
            data: JSON.stringify(UserObject),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                 self.sendGet();
             }
        });
    };

//Delete User
    self.deleteUser = function (user) {
         $.ajax({
            url: "/api/user?id=" + user.id,
            type: "DELETE",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                 //self.sendGet();
                self.userList.remove(function (item) { return item.id === user.id; });
             }
        });
    };

    // Clear Fields  
    self.clearFields = function clearFields() {
        self.Id('');
        self.ForeName('');
        self.SurName('');
        self.Email('');
        self.CreatedDate('');
    };

    //Get Detail User  
    self.detailUser = function (selectedUser) {

        self.Id(selectedUser.id);
        self.ForeName(selectedUser.foreName);
        self.SurName(selectedUser.surName);
        self.Email(selectedUser.email);
        self.CreatedDate(selectedUser.createdDate);

        $('#Save').hide();
        $('#Clear').hide();

        $('#Update').show();
        $('#Cancel').show();

    };

    self.cancel = function () {

        self.clearFields();

        $('#Save').show();
        $('#Clear').show();

        $('#Update').hide();
        $('#Cancel').hide();
    };
    
};

$(function () {
    var viewModel = new ViewModel();
 ko.applyBindings(viewModel);

    $.get("/api/user/list", function (items) {
        $.each(items, function (idx, item) {
viewModel.add(item);
            
        });
    }, "json");
   
});
