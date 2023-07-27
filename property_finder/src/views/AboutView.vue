<template>
  <div class="about">
    <div class="container">
      <div class="about-article about-main">
        <h2>About DTT Real Estate</h2>
        <p class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni cum possimus, recusandae eaque impedit soluta
          quae pariatur blanditiis reiciendis suscipit ducimus nesciunt minima quam ex! Non fugit omnis est laudantium!
          Deserunt eaque perferendis optio at repudiandae. Iusto eum illum animi, numquam architecto in quibusdam,
          suscipit tempora perspiciatis enim odit. Dolores, accusamus modi? Magni sit earum facere voluptatum pariatur
          omnis distinctio!
          Enim nihil dolorum reiciendis totam! Reprehenderit delectus repellendus pariatur quia ullam aliquid voluptates
          officiis quo placeat totam, consequuntur repellat voluptatem ab deleniti soluta eum adipisci, cum aliquam, quasi
          excepturi. Iusto?
          Quibusdam ullam tempore similique, quidem cumque obcaecati aut excepturi, tempora quis reprehenderit laborum
          assumenda totam saepe temporibus quam. Facilis et ea quidem porro beatae minus minima, aliquid suscipit quo
          voluptatibus!</p>
        <p class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci placeat a eum illo libero dolor obcaecati
          numquam distinctio deleniti porro nesciunt deserunt exercitationem nobis, dolore consectetur, enim quis ab
          rerum?</p>
      </div>

      <div class="about-article about-footer">
        <h2>Design and Development</h2>
        <div class="about-footer-main">
          <img src="../assets/img_logo_dtt@3x.png" alt="Logo">
          <div class="about-footer-links">
            <p class="text">By DTT</p>
            <a href="www.d-tt.nl">www.d-tt.nl</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/main.scss";

.container {
  display: flex;
  flex-direction: column;
  .about-article{
    margin-top: 50px;
    h2 {
      margin-bottom: 20px;
    }
  }
  .about-main{
    p {
      margin-bottom: 20px;
      color: $color-text-secondary;
    }
  }
  .about-footer-main{
    display: flex;
    flex-direction: row;

    img{
      width: 200px;
      margin-right: 40px;
    }
  }
  .about-footer-links{
    p{
      margin-bottom: 5px;
    }
    a{
      color: $color-text-link;
    }
    
  }
}


</style>
