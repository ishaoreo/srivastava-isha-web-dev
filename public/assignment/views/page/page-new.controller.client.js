(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController",NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        vm.createPage = createPage;

        function createPage(name, title) {
            //console.log(name);
            //console.log(title);
            if (validation(name)) {
         PageService.createPage(vm.websiteId, name, title)
             .then(
                 function(response){
                     var page =response.data;
                     $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                     

                 },
                 function(error){
                     vm.error = "Unable to create page";
                 }

             );

        }}  //end of createPage
        
        function validation(name) {
            if (name == null) {
                vm.error = "Name has to be entered!";
                $("#name").css("background-color", "lightcoral");
                return false;
            }
            return true;
        }
    };

})();