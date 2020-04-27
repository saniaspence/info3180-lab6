/* Add your Application JavaScript */
const NewsList = Vue.component('news-list',{
    template: `
      <div class="news">
        <h2 class="text-center">News</h2>
        <div class="form-inline d-flex justify-content-center">
          <div class="form-group mx-sm-3 mb-2">
            <label class="sr-only" for="search">Search</label>
            <input type="search" name="search" v-model="searchTerm"
            id="search" class="form-control mb-2 mr-sm-2" placeholder="Enter a search term here" />
            <button class="btn btn-primary mb-2"@click="searchNews">Search</button>
          </div>


        </div>
        <ul class="news__list row cnterline" type ='none' >
          <li class='card mb-1 news__item mr-2 mb-2 col-sm-3' v-for="article in articles">
            <h5 class='card-title'>{{ article.title }} </h5>
            <img style="width:100%" v-bind:src="article.urlToImage">
            <p class="card-text text-muted"> {{ article.description}} </p>
          </li>
        </ul>
      </div >
    `,

    created: function() {
      let self = this;
      fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=<your-api-key>')
      .then(function(response) {return response.json();})
      .then(function(data) {self.articles = data.articles});
      } ,
    
    data: function(){
      return{
        articles:[],
        searchTerm : ''
      }
    },

    methods: {
      searchNews: function() {
        let self = this;
        fetch('https://newsapi.org/v2/everything?q='+ self.searchTerm + '&language=en&apiKey=<your-api-key>')
        .then(function(response) {return response.json();})
        .then(function(data) {self.articles = data.articles;
        });
      }
    }

  });

Vue.component('app-header', {
    template: `
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
              <a class="navbar-brand" href="#">VueJS App</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <a class="nav-link" href="/">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/news">News</a>
                  </li>
                </ul>
              </div>
            </nav>
        </header>    
    `,
    data: function() {
      return {};
    }
});

Vue.component('app-footer', {
    template: `
        <footer>
            <div class="container">
                <p>Copyright &copy {{ year }} Flask Inc.</p>
            </div>
        </footer>
    `,
    data: function() {
        return {
            year: (new Date).getFullYear()
        }
    }
});




const Home = Vue.component('home', {
  template: `
    <div class="home">
      <img src="/static/images/logo.png" alt="VueJS Logo">
      <h1>{{ welcome }}</h1>
    </div>
  `,
  data: function() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  }
 });

 const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/news', component: NewsList }
  ]
 });
 
 const app = new Vue({
    el: '#app',
    router
});