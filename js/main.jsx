var PostPreview = function (title, previewText, author, datePublished, source) {
  this.title = title;
  this.previewText = previewText;
  this.author = author;
  this.datePublished = datePublished
  this.source = source
};
PostPreview.from = function (title, previewText, author, datePublished, source) {
  return new PostPreview(title, previewText, author, datePublished, source);
};
var posts = [
  PostPreview.from(
    "unfamiliar loss",
    "There's not much more I can say about this.",
    "Andy Liang",
    "09 August 2016",
    "unfamiliar-loss.html"),
  PostPreview.from(
    "@tailrec",
    "Next week I am returning to industry. It's been just under eight months since I've pulled in a steady paycheck and I'm just about ready to",
    "Andy Liang",
    "04 April 2016",
    "@tailrec.html"),
  PostPreview.from(
    "Metaprogramming In Rust",
    "Background I've been hanging out at the Recurse Center over the last seven weeks. People come to RC for lots of different reasons, from different backgrounds.",
    "Andy Liang",
    "13 November 2015",
    "metaprogramming-in-rust.html"),
  PostPreview.from(
    "Falling Back to Earth",
    "A follow-up It's been an incredible journey over the last month. Somewhere over either Vietnam or the South China Sea I was ambushed with the irony",
    "Andy Liang",
    "25 September 2015",
    "falling-back-to-earth.html"
  ),
  PostPreview.from(
    "The Only Risk Is That You Go Insane",
    "I landed in this country 6 days ago. I've traversed nearly 1,000 kilometers in that span via taxi, pickup truck, ferry, train, subway, mini-van, motorbike,",
    "Andy Liang",
    "06 September 2015",
    "the-only-risk-is-that-you-go-insane.html"
  ),
  PostPreview.from(
    "borrow checker battles in rust",
    "Likely the first thing that baby rustaceans will bang their heads on is the concept of lifetimes and the borrow checker. One of the things I",
    "Andy Liang",
    "24 July 2015",
    "borrow-checker-battles-in-rust.html"

  )
];

//this isnt really following react best practices. hastily written
var Previews = React.createClass({displayName: 'Preview',
  render: function() {
    var postPreviews = posts.map(post => {
      return (<article className="post">
        <header className="post-header">
          <h2 className="post-title"><a href={"/#/post/"+post.source}>{post.title}</a></h2>
        </header>
        <section className="post-excerpt">
          <p>{post.previewText} [...] </p>
        </section>
        <footer className="post-meta">
          <a>{post.author}</a> | <time class="post-date">{post.datePublished}</time>
        </footer>
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
    http.get("/posts/" + this.props.params.source, function (err, data) {
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
