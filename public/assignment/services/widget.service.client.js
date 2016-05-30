

(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://4.bp.blogspot.com/-AIX5WkSnskc/TfTQnn8OJPI/AAAAAAAAAMo/Ydg2iXNOS8w/s1600/shin_chan.gif"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p class="first-text">' +
        '<p>The program is set in <a href="/wiki/Antarctica" title="Antarctica">Antarctica</a> and centres around penguin families living and working in <a href="/wiki/Igloo" title="Igloo">igloos</a>. The main character, Pingu, belongs to one such family. He frequently goes on adventures with his little sister, Pinga, and often gets into mischief with his best friend, Robby the Seal.</p>' +
        'Investing in undersea internet cables has been a <a href="http://gizmodo.com/why-more-technology-giants-are-paying-to-lay-their-own-1703904291">big part of data strategy </a>plans for tech giants in recent years. Now Microsoft and Facebook are teaming up for the mother of all cables: A 4,100-mile monster that can move 160 Tbps, which will make it the highest-capacity cable on Earth. The cable even has a name,…<span class=" read-more-placeholder"></span></p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/xB5ceAruYrI" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function WidgetService(){
        var api = {
            findWidgetsForPageId : findWidgetsForPageId,
            findWidgetById : findWidgetById,
            createNewHeader : createNewHeader,
            createNewHTML : createNewHTML,
            createNewIMG : createNewIMG,
            createNewYoutube : createNewYoutube,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget
        };

        return api;

        function findWidgetsForPageId(pageId) {
            var results = [];
            for(var i in widgets){
                if(widgets[i].pageId === pageId){
                    results.push(widgets[i]);
                }
            }
            return results;
        }

        function findWidgetById(id) {
            for(var i in widgets){
                if(widgets[i]._id === id){
                    return widgets[i];
                }
            }
            return null;
        }
        function createNewHeader(pageId) {
            var newHeader = {
                _id : (new Date()).getTime()+"",
                widgetType : "HEADER",
                pageId : pageId
            };
            widgets.push(newHeader);
            return newHeader;
        }

        function createNewHTML(pageId) {

        }

        function createNewIMG(pageId) {
            var newVideo = {
                _id : (new Date()).getTime()+"",
                widgetType : "IMAGE",
                pageId : pageId
            };
            widgets.push(newVideo);
            return newVideo;
        }

        function createNewYoutube(pageId) {
            var newImage = {
                _id : (new Date()).getTime()+"",
                widgetType : "YOUTUBE",
                pageId : pageId
            };
            widgets.push(newImage);
            return newImage;
        }

        function updateWidget(widget) {
            var index = findWidgetIndex(widget._id);
            if(index == -1)
                return null;

            if(widget.widgetType === 'HEADER') {
                widgets[index].name = widget.name;
                widgets[index].text = widget.text;
                widgets[index].size = widget.size;
                return true;
            } else if(widget.widgetType === 'IMAGE') {
                widgets[index].name = widget.name;
                widgets[index].text = widget.text;
                widgets[index].width = widget.width;
                widgets[index].url = widget.url;
                return true;
            } else if(widget.widgetType === 'YOUTUBE') {
                widgets[index].name = widget.name;
                widgets[index].text = widget.text;
                widgets[index].width = widget.width;
                widgets[index].url = widget.url;
                return true;
            }

            return false;
        }

        function deleteWidget(widget) {
            var index = findWidgetIndex(widget._id);
            if(index == -1)
                return false;
            widgets.splice(index,1);
            return true;
        }

        function findWidgetIndex(id) {
            for(var i in widgets){
                if(widgets[i]._id === id){
                    return i;
                }
            }
            return -1;
        }
    }
})();