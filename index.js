const restaurantContainer = document.getElementById('restaurants');
const upwardName = document.getElementById('upward-name');
const downwardName = document.getElementById('downward-name');
const upwardRating = document.getElementById('upward-rating');
const downwardRating = document.getElementById('downward-rating');
const scrollUp = document.getElementById('scroll-up');
let restaurants;

window.onload = () => {
  M.AutoInit();
  get = (url) => {
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.open('GET', url, true);
      http.onload = () => {
        if (http.status == 200) {
          resolve(JSON.parse(http.response));
        } else {
          reject(http.statusText);
        }
      };
      http.onerror = () => {
        reject(http.statusText);
      };
      http.send();
    });
  };

  const promise = get('./melp.json');
  promise.then((rest) => {
    restaurants = rest
    let sorted = rest.sort(compare);
      sorted.forEach(element => {
        drawnRestaurants(element);
      });
    })
    .catch((error) => {
      console.log(error)
    });

    const drawnRestaurants = (restaurant) => {
      let card = `
      <li>
      <div class="collapsible-header" id=${restaurant.id}><i class="material-icons">restaurant</i>${restaurant.name}</div>
      <div class="collapsible-body">
        <h5>Rating: ${restaurant.rating}</  h5>
        <h5>Address</h5>
          <p>${restaurant.address.street}</p>
          <p>${restaurant.address.city}, ${restaurant.address.state}</p>
        <h5>Contact</h5>
          <p>${restaurant.contact.phone}</p>
          <a href=${restaurant.contact.site} target="_blank">${restaurant.contact.site}</a>
          <p>${restaurant.contact.email}</p>
          <div class="fb-like" data-href="https://karenamicone.github.io/melp/index.html" data-width="" data-layout="box_count" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>
      </div>
      </li>`;
      restaurantContainer.insertAdjacentHTML("beforeend", card);
    };

    const compare = (a,b)=>{
      return a.name.localeCompare(b.name)
      };

//-----------------------------DOM------------------------------------

    upwardName.addEventListener('click', ()=>{
      restaurantContainer.innerHTML="";
      restaurants.sort(compare).forEach(element => {
        drawnRestaurants(element);
      });
    });

    downwardName.addEventListener('click', ()=>{
      restaurantContainer.innerHTML="";
      restaurants.reverse(compare).forEach(element => {
        drawnRestaurants(element);
      });
    });

    upwardRating.addEventListener('click', ()=>{
      restaurantContainer.innerHTML="";
      restaurants.sort(((a, b)=> {return a.rating - b.rating})).forEach(element => {
        drawnRestaurants(element);
      });
    });

    downwardRating.addEventListener('click', ()=>{
      restaurantContainer.innerHTML="";
      restaurants.sort(((a, b)=> {return b.rating - a.rating})).forEach(element => {
        drawnRestaurants(element);
      });
    });

    onscroll = () => {scrollUpFunc()};

    function scrollUpFunc() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollUp.style.display = "block";
      } else {
        scrollUp.style.display = "none";
      }
    }

    scrollUp.addEventListener('click', 
    () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
    ); 

    document.addEventListener('DOMContentLoaded', function() {
      let elems = document.querySelectorAll('.collapsible');
      let instances = M.Collapsible.init(elems, options);
    });
}