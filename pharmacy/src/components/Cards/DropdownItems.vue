<template>
    

  <header class="header">
    <nav class="header__nav">
      <ul class="header__navbar">
        <li class="header__item">
          <a href="#" class="header__link">
            <transition name="slide-fade">
              <!-- Header Navigation Menu Icons -->
              <button class="header--button" v-if="show" key="on" @click="show = false">
                <svg viewBox="0 0 24 24" class="header--icon">
                  <title>Close</title>
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path fill="currentColor" d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                </svg>
              </button>
              <button class="header--button" v-else key="off" @click="show = true">
                <svg viewBox="0 0 24 24" class="header--icon">
                  <title>Navigation Menu</title>
                  <path fill="currentColor" d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z" />
                </svg>
              </button>
            </transition>
          </a>
         
        </li>
      </ul>
    </nav>
  </header>



</template>
<script>
export default {


  data: function(){
    
      return{
          show: false
          }
  }
}
</script>
<style scoped>
:root {
  --font-primary: 'Open Sans', sans-serif;
  --color-gray: #dadce0;
}

 /* Global */

/* *,
::after,
::before {
  box-sizing: border-box;
} */

/* body {
  font-size: 1rem;
  -webkit-text-size-adjust: 100%;
  font-family: var(--font-primary);
  overflow: hidden;
} */

/* Header Menu */

.header {
  padding: 2rem 5rem 2rem 5rem;
}
.header__nav {
    position: relative
  }
/* .header__navbar {
    
  } */
.header__item {
    padding: 1rem;
  }
.header--icon {
    width: 1.65rem;
    height: 1.65rem;
  }
.header--button {
    top: 0;
    right: 0;
    /* position: absolute; */
    margin-left: -25%;
    padding: 0;
    color: gray;
    cursor: pointer;
    border: 1px solid transparent;
    background-color: transparent;
     }
    





  

</style>