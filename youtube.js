function init() {
    gapi.client.setApiKey("AIzaSyDDRFC6h1sm7wS3tOxUQNXOA82xnU5auh4");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}