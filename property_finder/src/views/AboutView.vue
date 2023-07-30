<template>
  <div class="about">
    <div class="container">
      <div class="about-article about-main">
        <h2>About DTT Real Estate</h2>
        <p class="text">From a student room in 2010 to a full-service digital agency in the heart of Amsterdam. Our story
          is one of those. A story we are very proud of.We - the 60+ enthusiastic strategists, designers, developers and
          testers - who work together daily on the most beautiful projects. And we have been doing so since 2010 for small
          and large clients - from independent entrepreneurs, startups, the public sector and SMEs, to multinationals like
          Randstad and nonprofits like Greenpeace.
          Clients with diverse objectives, target groups and resources, challenging us time and again to develop a
          suitable digital solution. As a team, this makes us rich in experience, flexible and enormously versatile. And
          that is precisely where our strength lies.</p>

        <h2>About Developer</h2>
        <p class="text">As a highly motivated and proactive individual with strong soft skills, I am excited to embark on
          mycareer path. Through attending different courses and self-education, I have gained a solid foundation
          inprogramming languages such as HTML, CSS, JavaScript, Typescript and Salesforce.
          I have also gainedexperience using popular framework such as React, and have worked on projects that involve
          APIintegration, user authentication, and responsive design. I am committed to continuously improving myskills
          and staying up-to-date with the latest industry trends. I am confident in my ability to quicklylearn new
          technologies and adapt to different programming languages and frameworks.
          Beyond technical skills, I am a strong team player who values communication and collaboration. Ibelieve that
          working in a team is essential to achieving success in any project, and I strive to maintainopen lines of
          communication to ensure that everyone is on the same page.</p>
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

  .about-article {
    margin-top: 50px;

    h2 {
      margin-bottom: 20px;
    }
  }

  .about-main {
    p {
      margin-bottom: 20px;
      color: $color-text-secondary;
    }
  }

  .about-footer-main {
    display: flex;
    flex-direction: row;

    img {
      width: 200px;
      margin-right: 40px;
    }
  }

  .about-footer-links {
    p {
      margin-bottom: 5px;
    }

    a {
      color: $color-text-link;
    }

  }
}

@media only screen and (max-width: 600px) {
  .about-footer-main {
    margin-bottom: 100px !important;
  }
}
</style>
