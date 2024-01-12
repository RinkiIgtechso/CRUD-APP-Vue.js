<template>
  <router-view/>
</template>


<style>
body{
  margin: 0 !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
nav{
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1.95px 2.6px;
  padding: 1.7rem;
  display: flex;
  justify-content: end;
  gap: 2rem;
  font-size:1.2rem;
  font-weight: bold;
  color:teal;
}

a{
  text-decoration: none;
  color:teal;
}
.logout{
  cursor: pointer;
}
</style>
