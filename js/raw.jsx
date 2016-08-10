var PostPreview = function (title, author, datePublished, source) {
  this.title = title;
  // this.previewText = previewText;
  this.author = author;
  this.datePublished = datePublished
  this.source = source
};
PostPreview.from = function (title, previewText, author, datePublished, source) {
  return new PostPreview(title, previewText, author, datePublished, source);
};
var posts = [
  PostPreview.from(
    "post[0]",
    "Andy Liang",
    "20 July 2016",
    "0.html"),
  PostPreview.from(
    "loss",
    "Andy Liang",
    "09 August 2016",
    "1-loss.html")
];

//this isnt really following react best practices. hastily written
var Previews = React.createClass({displayName: 'Preview',
  render: function() {
    var postPreviews = posts.map(post => {
      return (<article className="post">
        <header className="post-header">
          <h2 className="post-title"><a href={"#/post/"+post.source}>{post.title}</a></h2>
        </header>
      </article>
    )});
    return (
      <div>{postPreviews}</div>
    )
  }
});
var http = {
  get: function (url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        callback(null, xmlHttp.responseText);
      }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
  }
}

var Post = React.createClass({displayName: 'Post',
  getInitialState: function () {
    return {};
  },
  componentWillMount: function () {
    var self = this;
    http.get("/rawposts/" + this.props.params.source, function (err, data) {
      self.setState({
        html: data
      });
    });
  },
  render: function () {
    return (
      <div className="content">
        <article className="post">
          <section className="post-content" dangerouslySetInnerHTML={{__html: this.state.html}}></section>
        </article>
      </div>
    )
  }
})

ReactDOM.render((
  <ReactRouter.Router>
    <ReactRouter.Route path="/" component={Previews} />
    <ReactRouter.Route path="/post/:source" component={Post} />
  </ReactRouter.Router>
), document.getElementById('content'))
