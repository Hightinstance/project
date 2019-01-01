<template>
<div>
     <header-nav></header-nav>
     <router-view></router-view>
</div>
</template>

<script>
  import HeaderNav from "./components/header-nav";

export default {
    components:{
      HeaderNav
    }
}
</script>

<style>

</style>
