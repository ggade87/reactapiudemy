this is demo axios api integration to react project id usemy course 
https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8145376#announcements

notes
Section 9 : Reaching out to the web (http/ Ajax)

How we can send ajax request to the server.
Understanding http request in React:
React can not communicate with server directly as it is front end library hence when we try to communicate with server it does not return html page but it return JSON data.
 
Or we can send JSON data to server hence server is a restful api
Understanding AXIOS :
Use free online api for development 
https://jsonplaceholder.typicode.com/
JavaScript has XMLHttpRequest object to communicate with server with this object we an create own ajax request and send them to the server.
Another type is to use AXIOS library
Install axios
Nom install axios –save
Creating Http request to get data
Import axios from ‘axios’;
componentDidMount is the best place to send the http request which call render and update state
axios take longer time to execute and javascript don’t wait for it to return data and javascript execute code in synchronous manners hence we can not store data return from axios in const but  axios use promises which introduced in ES6 
and axios return promises using then 
componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      console.log(response);
    });
  }

Rendering fetch data to screen:
import axios from "axios";
class Blog extends Component {
  state = {
    posts: [],
  };
  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      this.setState({ posts: response.data });
      console.log(response);	
    });
  }
  render() {
    const posts = this.state.posts.map((post) => {
      return <Post key={post.id} title={post.name}></Post>;
    });
    return (
      <div>
        {posts} 
      </div>
    );
  }
}
export default Blog;

Transforming Data:
We can change coming data and filter and display only required data
import axios from "axios";
class Blog extends Component {
  state = {
    posts: [],
  };
  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      const posts = response.data.slice(0, 4);
      const updatePosta = posts.map((post) => {
        return {
          ...post,
          auther: "Ganesh",
        };
      });
      this.setState({ posts: updatePosta });
      console.log(response);
    });
  }
  render() {
    const posts = this.state.posts.map((post) => {
      return <Post key={post.id} title={post.name} auther={post.auther}></Post>;
    });
    return (
      <div>
       {posts} 
      </div>
    );
  }
}

export default Blog;

Making a post selectable

import axios from "axios";
class Blog extends Component {
  state = {
    posts: [],
  };
  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      const posts = response.data.slice(0, 4);
      const updatePosta = posts.map((post) => {
        return {
          ...post,
          auther: "Ganesh",
          selectedPostId: null,
        };
      });
      this.setState({ posts: updatePosta });
      console.log(response);
    });
  }

  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id });
  };
  render() {
    const posts = this.state.posts.map((post) => {
      return (
        <Post
          key={post.id}
          title={post.name}
          auther={post.auther}
          clicked={() => this.postSelectedHandler(post.id)}
        ></Post>
      );
    });
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;

Fetching data on update (Without creating Infinite loops)
Send http request once we got valid ID componentDidUpdate used,
We can not use useState on componetDidMount as it call render and and then will call componentDidMount again and goes in infinite loop to prevent this infinite loop use condition in componentDidMount for using useState.
componentDidUpdate() {
    if (this.props.id) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)
      ) {
        axios
          .get("https://jsonplaceholder.typicode.com/posts/" + this.props.id)
          .then((response) => {
            console.log(response);
            this.setState({ loadedPost: response.data });
          });
      }
    }
  }

Posting data to server:
Post data use axios.post method we can send data to post as javascript object
postDataHandler = () => {
    const data = {
      title: this.state.title,
      body: this.state.content,
      auther: this.state.author,
    };
    axios.post("https://jsonplaceholder.typicode.com/posts", data)
      .then((Response) => {
        console.log(Response);
      });
  };
Sending delete request:
We can use axios.delete method which take URl with data like id and then will return promise response.
  deletePostHandler = () => {
    axios.delete("https://jsonplaceholder.typicode.com/posts/" + this.props.id)
      .then((response) => {
        console.log(response);
      });
  };

Handling error locally :
Request to server api may not success all the time some time we get an error to handled the error axios has second method promise method catch this method catch error and we can display that error hence application will not carash 
componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/usersss")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatePosta = posts.map((post) => {
          return {
            ...post,
            auther: "Ganesh",
          };
        });
        this.setState({ posts: updatePosta });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: true });
      });
  }

Adding Interceptors to execute Code Globally.
This execute code globally when we call every axios request. Loke setting common authorisation header or want to log responses or want to handle error globally 
How to add Interceptors:
Index.js : import axios here globally 
Adding code here will work globally 
This technique use to create global error req and res logger for project
Example index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";

axios.interceptors.request.use(
  (request) => {
    console.log(request);
    //We can edit request before we send add header
    return request;
  },
  (error) => {
    console.log("Global Error" + error);
    return Promise.reject(error);
  }
);

//handle response

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    //We can edit response before
    return response;
  },
  (error) => {
    console.log("Global Error" + error); // Log error here
    return Promise.reject(error);
  }
);
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();

Removing Interceptors
You learned how to add an interceptor, getting rid of one is also easy. Simply store the reference to the interceptor in a variable and call eject  with that reference as an argument, to remove it (more info: https://github.com/axios/axios#interceptors):

var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);

Setting a default global configuration for Axios:
Instead of writing all api url on axios get post delete method set api url globally
How to set it globally 
In global index.js
Set
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
Then simply call api method
  axios.get("/posts/" + this.props.id).then((response) => {
          console.log(response);
          this.setState({ loadedPost: response.data });
        });

How to sent header 
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";

Creating and Using axios instances:
We can set global url and header In index.js what if we want to use different url and hearders for this we can use instances object
To cerate instance create axios.js file in root and import it in project files instead of real axios import 
Import axios from ‘../../axios’
Axios.get(‘/post/………

Axios.js example
import axios from "axios";
const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
instance.defaults.headers.common["Authorization"] = "AUTH TOKEN";
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.interceptors.request.use(
  (request) => {
    console.log(request);
    //We can edit request before we send add header
    return request;
  },
  (error) => {
    console.log("Global Error" + error);
    return Promise.reject(error);
  }
);
export default instance;

Udemy demo project has been uploaded on url
https://github.com/ggade87/reactapiudemy
