"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[908],{3271:(e,i,t)=>{t.d(i,{O:()=>a});const a=12},298:(e,i,t)=>{t.d(i,{$:()=>n});var a=t(5043),o=t(3271),r=t(4544),s=t(8250);const n=()=>{const[e,i]=(0,a.useState)([]);(0,a.useLayoutEffect)((()=>{const e=(0,r.Ml)(s.YN);e&&i(e)}),[]);const t=(0,a.useCallback)((t=>{const a=e.length;!e.find((e=>{let{id:i}=e;return i===t.id}))&&a<o.O&&i((e=>{const i=[...e,t];return(0,r.gC)(s.YN,i),i}))}),[e]),n=(0,a.useCallback)((e=>{i((i=>{const t=i.filter((i=>{let{id:t}=i;return t!==e.id}));return(0,r.gC)(s.YN,t),t}))}),[e]);return{selectedMovies:e,selectMovie:t,deleteMovie:n}}},9427:(e,i,t)=>{t.d(i,{_:()=>c});var a=t(5043),o=t(9968),r=t(8029),s=t(5869),n=t(459);const l=n.J1`
  query GetSavedMovies($page: Int, $all: Boolean) {
    getSavedMovies(page: $page, all: $all) {
      page
      totalResults
      totalPages
      results {
        id
        movieId
        title
        image
        releaseDate(format: "dd.MM.yyyy")
        voteAverage
        voteCount
      }
    }
  }
`,d=n.J1`
  mutation SaveMovie($movie: MovieInput!) {
    saveMovie(movie: $movie) {
      id
      movieId
      title
      releaseDate(format: "dd.MM.yyyy")
      image
      voteAverage
      voteCount
    }
  }
`,v=n.J1`
  mutation RemoveMovie($id: ID!) {
    removeMovie(id: $id) {
      id
      movieId
      title
      releaseDate(format: "dd.MM.yyyy")
      image
    }
  }
`,c=()=>{const{state:e}=(0,a.useContext)(o.B),[i,t]=(0,a.useState)(!1),[n]=(0,r.n)(d),{loading:c,error:m,data:u,refetch:g}=(0,s.IT)(l,{variables:{page:1,all:!0}}),[y]=(0,r.n)(v),[h,f]=(0,a.useState)([]);(0,a.useLayoutEffect)((()=>{e.user&&g()}),[e.user,g]),(0,a.useLayoutEffect)((()=>{u&&null!==u&&void 0!==u&&u.getSavedMovies&&f(u.getSavedMovies.results)}),[u]);return{savedMovies:h,addMovieToSaved:async e=>{t(!0);if(!h.find((i=>{let{id:t}=i;return t===e.id}))){f((i=>[...i,{...e,movieId:e.id}]));try{var i;const t={id:e.id,title:e.title,releaseDate:e.releaseDate,image:e.image||"",genres:(null===e||void 0===e||null===(i=e.genres)||void 0===i?void 0:i.map((e=>e.id)))||[],adult:e.adult||!1,backdropPath:e.backdropPath||"",originalLanguage:e.originalLanguage||"",originalTitle:e.originalTitle||"",overview:e.overview||"",popularity:e.popularity||0,video:e.video||!1,voteAverage:e.voteAverage||0,voteCount:e.voteCount||0};return await n({variables:{movie:t}}),!0}catch(m){return console.error("Error saving movie:",m),!1}finally{t(!1)}}},removeMovieFromSaved:async e=>{t(!0);try{return await y({variables:{id:e.id}}),f((i=>i.filter((i=>{const t=!i.movieId||String(i.movieId)!==String(e.id);return String(i.id)!==String(e.id)&&t})))),!0}catch(m){return console.error("Error removing movie:",m),!1}finally{t(!1)}},savedMoviesLoading:i,loading:c,error:m}}},4908:(e,i,t)=>{t.r(i),t.d(i,{default:()=>b});var a=t(5043),o=t(3704),r=t(6446),s=t(8903),n=t(3336),l=t(5869);const d=t(459).J1`
  query Movies($filter: MoviesFilterInput) {
    movies(filter: $filter) {
      page
      totalResults
      totalPages
      results {
        id
        title
        image: posterPath
        releaseDate(format: "dd.MM.yyyy")
        voteAverage
        voteCount
      }
    }
  }
`;var v=t(4316),c=t(298),m=t(3649),u=t(8250);var g=t(9427),y=t(9968),h=t(3271),f=t(2718),M=t(3226),p=t(579);const x=[{id:28,name:"Action"},{id:12,name:"Adventure"},{id:16,name:"Animation"},{id:35,name:"Comedy"},{id:80,name:"Crime"},{id:99,name:"Documentary"},{id:18,name:"Drama"},{id:10751,name:"Family"},{id:14,name:"Fantasy"},{id:36,name:"History"},{id:27,name:"Horror"},{id:10402,name:"Music"},{id:9648,name:"Mystery"},{id:10749,name:"Romance"},{id:878,name:"Science Fiction"},{id:10770,name:"TV Movie"},{id:53,name:"Thriller"},{id:10752,name:"War"},{id:37,name:"Western"}],A=(new Date).getFullYear(),j=Array.from({length:A-1900+1},((e,i)=>A-i)),b=()=>{var e,i;const{savedMovies:t,addMovieToSaved:A,removeMovieFromSaved:b,savedMoviesLoading:C}=(0,g._)(),{state:S}=(0,a.useContext)(y.B),{filter:_,setPage:w,setFilter:D}=(()=>{const[e,i]=(0,a.useState)({page:1,sortBy:"popularity",sortDirection:u.Pg.DESC,search:""}),t=(0,a.useCallback)((t=>{i({...e,page:t})}),[e]),o=(0,a.useCallback)((t=>{i({...e,...t,page:e.search!==t.search||e.genre!==t.genre||e.year!==t.year?1:t.page,year:+t.year,genre:""===t.genre?NaN:t.genre,primaryReleaseYear:+t.primaryReleaseYear})}),[e]);return{filter:e,setPage:t,setFilter:o}})(),{selectedMovies:I,selectMovie:P,deleteMovie:$}=(0,c.$)(),[F,T]=(0,a.useState)(""),[k,N]=(0,a.useState)([]),{showNotification:E,NotificationComponent:z}=(0,m.i)(),{loading:L,error:B,data:R}=(0,l.IT)(d,{variables:{filter:{page:_.page,sortBy:_.sortBy,sortDirection:_.sortDirection,year:_.year,genre:_.genre,search:_.search}}});(0,a.useEffect)((()=>{var e,i;(null===R||void 0===R||null===(e=R.movies)||void 0===e||null===(i=e.results)||void 0===i?void 0:i.length)>0?N((e=>R.movies.results.map((i=>{const t=e.find((e=>e.id===i.id));return{...i,image:t?t.image:i.image}})))):N([])}),[R]);const Y=e=>{const i=I.length;switch(!0){case!!I.find((i=>{let{id:t}=i;return t===e.id})):return void E((0,p.jsx)(M.A,{id:"notification.movie_already_selected"}),"error",5e3,{vertical:"bottom",horizontal:"right"});case i>=h.O:return void E((0,p.jsx)(M.A,{id:"notification.list_limit_reached"}),"error",5e3,{vertical:"bottom",horizontal:"right"});default:E((0,p.jsx)(M.A,{id:"notification.movie_added_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"})}P(e)},H=e=>{E((0,p.jsx)(M.A,{id:"notification.movie_removed_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"}),$(e)};return B?(console.log(`error in home page: ${B}`),(0,p.jsx)(v.gP,{})):(0,p.jsxs)(r.A,{sx:{flexGrow:1,marginTop:2},children:[(0,p.jsx)(v.hH,{user:S.user||null,title:F,movieId:F,open:!!F,onClose:()=>{T("")},selectedMovies:I,selectMovie:Y,deleteMovie:H,addFavoriteMovie:async e=>{await A(e)?E((0,p.jsx)(M.A,{id:"notification.movie_add_to_favorite_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"}):E("Error in saving movie","error",5e3,{vertical:"bottom",horizontal:"right"})},removeFavoriteMovie:async e=>{await b(e)?E((0,p.jsx)(M.A,{id:"notification.movie_removed_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"}):E("Error in removing movie","error",5e3,{vertical:"bottom",horizontal:"right"})},savedMovies:t,savedMoviesLoading:C}),z,(0,p.jsxs)(s.Ay,{container:!0,spacing:2,children:[(0,p.jsx)(s.Ay,{item:!0,xs:12,children:(0,p.jsx)(v.Cu,{initialValues:_,onSubmit:e=>{D(e)},genres:x,years:j})}),(0,p.jsx)(s.Ay,{item:!0,xs:12,md:8,children:(0,p.jsxs)(n.A,{children:[(0,p.jsxs)(r.A,{sx:{flexGrow:1,padding:2},children:[L&&(0,f.A)({favoriteMode:!1}),k&&k.length>0&&(0,p.jsx)(s.Ay,{container:!0,spacing:2,children:k.map(((e,i)=>(0,p.jsx)(s.Ay,{item:!0,xs:12,md:4,lg:3,children:(0,p.jsx)(o.P.div,{className:"portfolio__item",variants:u.IM,initial:"hidden",animate:"visible",custom:i,children:(0,p.jsx)(v.NU,{movie:e,onCardSelect:Y,openMovieDetailsById:T,selected:I.find((i=>{let{id:t}=i;return t===e.id})),favorites:t.find((i=>{let{id:t,movieId:a}=i;return t===e.id||e.id===a}))})})},e.id)))})]}),(0,p.jsx)(r.A,{mt:2,pb:2,sx:{display:"flex",justifyContent:"center"},children:(0,p.jsx)(v.mg,{totalPages:Number(null===R||void 0===R||null===(e=R.movies)||void 0===e?void 0:e.totalPages)>500?500:(null===R||void 0===R||null===(i=R.movies)||void 0===i?void 0:i.totalPages)||1,page:_.page,paginationHandler:(e,i)=>{w(i),setTimeout((()=>{window.scrollTo({top:0,behavior:"smooth"})}),100)}})})]})}),(0,p.jsx)(s.Ay,{item:!0,xs:12,md:4,children:(0,p.jsx)(v.C6,{selectedMovies:I,onCardDelete:H})},"Selected Movie")]})]})}},2718:(e,i,t)=>{t.d(i,{A:()=>s});var a=t(8903),o=t(7121),r=t(579);const s=e=>{let{favoriteMode:i=!1}=e;return(0,r.jsx)(a.Ay,{container:!0,spacing:2,children:Array.from(new Array(8)).map(((e,t)=>(0,r.jsxs)(a.Ay,{item:!0,xs:12,md:i?3:4,lg:i?2:3,children:[(0,r.jsx)(o.A,{variant:"rectangular",height:431}),(0,r.jsx)(o.A,{variant:"text",height:32}),(0,r.jsx)(o.A,{variant:"text",height:32})]},t)))})}}}]);
//# sourceMappingURL=908.e3a06021.chunk.js.map