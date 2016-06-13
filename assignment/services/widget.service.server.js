module.exports = function (app,models) {

    var widgetModel = models.widgetModel;

    var multer = require('multer'); // npm install multer save
    var upload = multer ({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.post("/api/upload",upload.single('myFile'),uploadImage);
    app.put("/page/:pageId/widget",reorderWidget);

    function reorderWidget(req,res){

        var pageId = req.params.pageId;
        var start = req.query.start;
        var end = req.query.end;

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets) {
                    widgets.forEach(function(widget){
                        delete widget._id;
                        if(widget.order==start){
                            widget.order = end;
                        }
                        else if(widget.order>start && widget.order<=end){
                            widget.order = widget.order-1;
                        }
                        else if(widget.order<start && widget.order>=end){
                            widget.order = widget.order+1;
                        }

                    });
                    // console.log(widgets);
                    widgetModel
                        .reorderWidget(pageId,widgets)
                        .then(
                            function(response){
                                res.json(widgets);
                            },
                            function(error){
                                res.json({});
                            });
                },
                function(error){
                    res.json({});
                });
    }

    function createWidget(req,res){
        var id = req.params.pageId;
        var newWidget = req.body;
        widgetModel
            .createWidget(id,newWidget)
            .then(
                function(widget){
                    res.json(widget);
                },
                function(error){
                    res.json({});
                }
            );
    }

    function findAllWidgetsForPage(req,res) {
        var id = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(id)
            .then(
                function(widget){
                    res.json(widget);
                },
                function(error){
                    res.json({});
                }
            );
    }

    function findWidgetById(req,res) {
        var id = req.params.widgetId;
        widgetModel
            .findWidgetById(id)
            .then(
                function(widget){
                    res.json(widget);
                },
                function(error){
                    res.json({});
                }
            );
    }

    function updateWidget(req,res) {
        var id = req.params.widgetId;
        var widget = req.body;
        widgetModel
            .updateWidget(id,widget)
            .then(
                function(widget){
                    res.json(widget);
                },
                function(error){
                    res.json({});
                }
            );
    }

    function deleteWidget(req,res) {
        var id = req.params.widgetId;
        widgetModel
            .deleteWidget(id)
            .then(
                function(widget){
                    res.json(200);
                },
                function(error){
                    res.json(400);
                }
            );
    }

    function uploadImage(req, res) {

        var widgetId = req.body.widgetId ;
        var width = req.body.width ;
        var myFile = req.file;
        if(myFile) {
            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename; // new file name in upload folder
            var path = myFile.path; // full path of uploaded file
            var destination = myFile.destination; // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;

            var id = req.params.widgetId;
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i].url = "/uploads/" + filename;
                    // console.log(widgets[i]);
                }
            }
        }

        console.log(req.body);
        res.redirect("/assignment/index.html#/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget/" + widgetId);

    }


}


//
// /* unlike angular, if w e ask by name, we cant get it */
//
// module.exports= function(app){
//
//     var multer = require('multer'); // npm install multer --save
//     var upload = multer({ dest: __dirname+'/../../public/uploads' });
//
//
//         var widgets = [
//         { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
//         { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//         { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
//             "url": "http://4.bp.blogspot.com/-AIX5WkSnskc/TfTQnn8OJPI/AAAAAAAAAMo/Ydg2iXNOS8w/s1600/shin_chan.gif"},
//         { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p class="first-text">' +
//         '<p>The program is set in <a href="https://en.wikipedia.org/wiki/Pingu" title="Antarctica">Pingu</a> The main character, Pingu, belongs to one such family. He frequently goes on adventures with his little sister, Pinga, and often gets into mischief with his best friend, Robby the Seal.</p>' +
//         '<span class=" read-more-placeholder"></span></p>'},
//         { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//         { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
//             "url": "https://youtu.be/xB5ceAruYrI" },
//         { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
//     ];
//     /* John pappy's - declare APIs at top and write functions below */
//
//
//     app.post("/api/page/:pageId/widget", createWidget);
//     app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
//     app.get("/api/widget/:widgetId",findWidgetById);
//     app.put("/api/widget/:widgetId",updateWidget);
//     app.delete("/api/widget/:widgetId",deleteWidget);
//     //UPLOAD
//     app.post ("/api/upload", upload.single('myFile'), uploadImage);
//
//     /* pattern matching usies only base URL. it ignores anything after ?
//      app.get("/api/user/:userId", findUserById);
//      app.get("/api/user/:userId", findUserById);
//      are the same URLs to Express!     */
//     function uploadImage(req, res) {
//
//
//
//
//         var userId = req.body.userId;
//         var websiteId = req.body.websiteId;
//         var pageId = req.body.pageId;
//
//
//         var widgetId      = req.body.widgetId;
//         var width         = req.body.width;
//         var myFile        = req.file;
//
//         if(myFile == null) {
//             res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
//             return;
//         }
//
//
//         var originalname  = myFile.originalname; // file name on user's computer
//         var filename      = myFile.filename;     // new file name in upload folder
//         var path          = myFile.path;         // full path of uploaded file
//         var destination   = myFile.destination;  // folder where file is saved to
//         var size          = myFile.size;
//         var mimetype      = myFile.mimetype;
//
//
//         for (var i in widgets){
//             if(widgets[i]._id === widgetId){
//                 widgets[i].url = "/uploads/"+filename;
//
//
//             }
//         }
//
//         res.redirect("/assignment/#/user/"+userId +"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
//     }
//
//
//
//     function createWidget (req,res) {
//         var pageId = req.params.pageId;
//         var widget = req.body;
//         widgets.push(widget);
//         /* return true only if the JSON object is inserted */
//         res.send(200);
//     }
//
//
//     function findAllWidgetsForPage (req,res) {
//         var pageId = req.params.pageId;
//
//         var resultSet = [];
//         for(var i in widgets){
//             if(widgets[i].pageId === pageId){
//                 resultSet.push(widgets[i]);
//             }
//         } res.send(resultSet);
//     }
//     function findWidgetById (req,res) {
//         var widgetId  = req.params.widgetId;
//         for(var i in widgets){
//             if(widgetId === widgets[i]._id){
//                 res.send(widgets[i]);
//             }
//         }
//     }
//     function updateWidget (req,res) {
//
//         var widgetId  = req.params.widgetId;
//         var widget = req.body;
//
//         for(var i in widgets){
//             if(widgetId === widgets[i]._id){
//
//                 switch (widgets[i].widgetType){
//                     case "HEADER":
//                         widgets[i].name = widget.name;
//                         widgets[i].text = widget.text;
//                         widgets[i].size = widget.size;
//                         res.send(200);
//
//                     case "IMAGE":
//                         widgets[i].name = widget.name;
//                         widgets[i].text = widget.text;
//                         widgets[i].url = widget.url;
//                         widgets[i].width = widget.width;
//                         widgets[i].file = widget.file;
//                         res.send(200);
//
//                     case "YOUTUBE":
//                         widgets[i].name = widget.name;
//                         widgets[i].text = widget.text;
//                         widgets[i].url = widget.url;
//                         widgets[i].width = widget.width;
//                         res.send(200);
//                 }
//
//             }
//         }
//         res.send(400);
//     }
//     function deleteWidget (req,res) {
//         var widgetId  = req.params.widgetId;
//         for(var i in widgets){
//             if(widgetId === widgets[i]._id){
//                 widgets.splice(i,1);
//                 res.send(200);
//             }
//         }
//         res.sendStatus(400);
//
//     }
//
//
// };