
(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);

    function WidgetService($http){

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            reorderWidget:reorderWidget
        };
        return api;

        // createWidget(pageId, widget) - adds the widget parameter instance to the local widgets array.
        //     The new widget's pageId is set to the pageId parameter
        function createWidget(pageId, widget){
            var newWidget = {
                widgetType: widget.widgetType
            };
            return $http.post("/api/page/"+pageId+"/widget",newWidget);

        }

        // findWidgetsByPageId(pageId) - retrieves the widgets in local widgets array whose pageId
        // matches the parameter pageId
        function findWidgetsByPageId(pageId){
            var widgets = $http.get("/api/page/"+pageId+"/widget");
            return widgets;
        }

        //findWidgetById(widgetId) - retrieves the widget in local widgets array whose _id matches the widgetId parameter
        function findWidgetById(widgetId){
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }

        //updateWidget(widgetId, widget) - updates the widget in local widgets array whose _id matches the widgetId parameter
        function updateWidget(widgetId, widget) {
            var result = $http.put("/api/widget/"+widgetId,widget);
            return result;
        }

        //deleteWidget(widgetId) - removes the widget from local widgets array whose _id matches the widgetId parameter
        function deleteWidget(widgetId){
            var result = $http.delete("/api/widget/"+widgetId);
            return result;
        }

        function reorderWidget(pageId,start, end) {
            // var pageId =
            console.log(start);
            console.log(end);
            return $http.put("/page/"+pageId+"/widget?start="+start+"&end="+end);
        }

    }

})();

// (function(){
//     angular
//         .module("WebAppMaker")
//         .factory("WidgetService", WidgetService);
//
//     function WidgetService($http){
//         /* API is driven by the use cases*/
//         var api =  {
//             findWidgetsByPageId: findWidgetsByPageId,
//             updateWidget : updateWidget,
//             deleteWidget: deleteWidget,
//             findWidgetById: findWidgetById,
//             createWidget: createWidget
//         };
//         return api;
//         /*functions are implemented below*/
//
//         function createWidget(pageId, widget){
//             var url = "/api/page/"+pageId+"/widget";
//             return $http.post(url, widget);
//
//         }
//
//
//         function findWidgetsByPageId(pageId) {
//             var url = "/api/page/"+pageId+"/widget";
//             return $http.get(url);
//
//
//         }
//
//
//         function findWidgetById(widgetId) {
//             var url = "/api/widget/"+widgetId;
//             return $http.get(url);
//
//
//         }
//
//         function updateWidget(widgetId, widget) {
//             var url = "/api/widget/"+widgetId;
//             return $http.put(url, widget);
//         }
//
//
//         function deleteWidget(widgetId) {
//             var url = "/api/widget/"+widgetId;
//             return $http.delete(url);
//         }
//
//
//     }
// })();
//
// //
// //
// // (function(){
// //     angular
// //         .module("WebAppMaker")
// //         .factory("WidgetService", WidgetService);
// //     var widgets = [
// //         { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
// //         { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
// //         { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
// //             "url": "http://4.bp.blogspot.com/-AIX5WkSnskc/TfTQnn8OJPI/AAAAAAAAAMo/Ydg2iXNOS8w/s1600/shin_chan.gif"},
// //         { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p class="first-text">' +
// //         '<p>The program is set in <a href="https://en.wikipedia.org/wiki/Pingu" title="Antarctica">Pingu</a> The main character, Pingu, belongs to one such family. He frequently goes on adventures with his little sister, Pinga, and often gets into mischief with his best friend, Robby the Seal.</p>' +
// //         '<span class=" read-more-placeholder"></span></p>'},
// //         { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
// //         { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
// //             "url": "https://youtu.be/xB5ceAruYrI" },
// //         { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
// //     ];
// //
// //     function WidgetService(){
// //         var api = {
// //             findWidgetsForPageId : findWidgetsForPageId,
// //             findWidgetById : findWidgetById,
// //             createNewHeader : createNewHeader,
// //             createNewHTML : createNewHTML,
// //             createNewIMG : createNewIMG,
// //             createNewYoutube : createNewYoutube,
// //             updateWidget : updateWidget,
// //             deleteWidget : deleteWidget
// //         };
// //
// //         return api;
// //
// //         function findWidgetsForPageId(pageId) {
// //             var results = [];
// //             for(var i in widgets){
// //                 if(widgets[i].pageId === pageId){
// //                     results.push(widgets[i]);
// //                 }
// //             }
// //             return results;
// //         }
// //
// //         function findWidgetById(id) {
// //             for(var i in widgets){
// //                 if(widgets[i]._id === id){
// //                     return widgets[i];
// //                 }
// //             }
// //             return null;
// //         }
// //         function createNewHeader(pageId) {
// //             var newHeader = {
// //                 _id : (new Date()).getTime()+"",
// //                 widgetType : "HEADER",
// //                 pageId : pageId
// //             };
// //             widgets.push(newHeader);
// //             return newHeader;
// //         }
// //
// //         function createNewHTML(pageId) {
// //             var newHTML = {
// //                 _id : (new Date()).getTime()+"",
// //                 widgetType : "HTML",
// //                 pageId : pageId
// //             };
// //             widgets.push(newHTML);
// //             return newHTML;
// //
// //         }
// //
// //         function createNewIMG(pageId) {
// //             var newVideo = {
// //                 _id : (new Date()).getTime()+"",
// //                 widgetType : "IMAGE",
// //                 pageId : pageId
// //             };
// //             widgets.push(newVideo);
// //             return newVideo;
// //         }
// //
// //         function createNewYoutube(pageId) {
// //             var newImage = {
// //                 _id : (new Date()).getTime()+"",
// //                 widgetType : "YOUTUBE",
// //                 pageId : pageId
// //             };
// //             widgets.push(newImage);
// //             return newImage;
// //         }
// //
// //         function updateWidget(widget) {
// //             var index = findWidgetIndex(widget._id);
// //             if(index == -1)
// //                 return null;
// //
// //             if(widget.widgetType === 'HEADER') {
// //                 widgets[index].name = widget.name;
// //                 widgets[index].text = widget.text;
// //                 widgets[index].size = widget.size;
// //                 return true;
// //             } else if(widget.widgetType === 'IMAGE') {
// //                 widgets[index].name = widget.name;
// //                 widgets[index].text = widget.text;
// //                 widgets[index].width = widget.width;
// //                 widgets[index].url = widget.url;
// //                 return true;
// //             } else if(widget.widgetType === 'YOUTUBE') {
// //                 widgets[index].name = widget.name;
// //                 widgets[index].text = widget.text;
// //                 widgets[index].width = widget.width;
// //                 widgets[index].url = widget.url;
// //                 return true;
// //             }
// //
// //             return false;
// //         }
// //
// //         function deleteWidget(widget) {
// //             var index = findWidgetIndex(widget._id);
// //             if(index == -1)
// //                 return false;
// //             widgets.splice(index,1);
// //             return true;
// //         }
// //
// //         function findWidgetIndex(id) {
// //             for(var i in widgets){
// //                 if(widgets[i]._id === id){
// //                     return i;
// //                 }
// //             }
// //             return -1;
// //         }
// //     }
// // })();