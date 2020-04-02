var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
    if (req.url === '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            var newpath = '/Users/bmeyer/tmp/' + files.filetoupload.name;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>File Upload Example</h1>');
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input id="file-to-upload" type="file" name="filetoupload"><br>');
        res.write('<input id="submit" type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);
