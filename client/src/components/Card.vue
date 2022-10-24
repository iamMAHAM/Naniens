<template lang="">
  <div class="card-container">
    <div class="user-card front">
      <div class="user-top">
        <div class="tt">
          <span class="tl">
            <i class="fa-regular fa-thumbs-up"></i>
            <span class="nb-likes">5k</span>
          </span>
          <span class="status"
            :style="{
              backgroundColor: info.isBusy ? 'var(--red)' : 'var(--green)'
            }"
          >
            {{ info.isBusy ? 'BUSY' : 'FREE'}}
          </span>
        </div>
      </div>

      <div class="user-center">
        <div class="ct">
          <img :src="info.profilUrl">
          <span class="fullname">{{ info.fullName?.toUpperCase() }}</span>
        </div>

        <div class="spec-logo">
          <span class="spec">Développeur {{ info.speciality }}</span>
          <img :src="getImage(`${info.speciality}`)" alt="image de spécialité">
        </div>
      </div>

      <div class="user-bottom">
        <div class="user-icones">
          <a :href="info.linkedinUrl" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
          <a :href="info.githubUrl" target="_blank"><i class="fa-brands fa-github"></i></a>
          <a :href="info.portfolioUrl" target="_blank"><i class="fa-regular fa-address-card"></i></a>
        </div>
      </div>
    </div>
    <div class="user-card back">
      <div class="user-top back" style="background:none">
        <p>GÉNÉRATION :  {{ info.generation }}</p>
        <p>COMPÉTENCES</p>
      </div>
      <div class="skills">
        <div class="skill">
          <span>Front-End : </span>
          <div class="simages">
            <img
              v-for="img in info.skills.frontEnd"
              :src="getImage(img)"
              :alt="`maitrise de ${img}`"
            >
          </div>
        </div>
        <div class="skill">
          <span>Back-End : </span>
          <div class="simages">
            <img
              v-for="img in info.skills.backEnd"
              :src="getImage(img)"
              :alt="`maitrise de ${img}`"
            >
          </div>
        </div>
        <div class="skill">
          <span>Database : </span>
          <div class="simages">
            <img
              v-for="img in info.skills.databases"
              :src="getImage(img)"
              :alt="`maitrise de ${img}`"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Info{
  fullName: {
        type: String,
        required: false,
        default: ''
      },
      speciality: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
      gender: {
        type: String,
        required: false,
        default: 'M'
      },
      age: {
        type: Number,
        required: false
      },
      profilUrl: {
        type: String,
        required: false
      },
      linkedinUrl: {
        type: String,
        required: false
      },
      githubUrl: {
        type: String,
        required: false,
        default: 'https://github.com'
      },
      portfolioUrl: {
        type: String,
        required: false,
      },
      phoneNumber: {
        type: String,
        required: false
      },
      generation: {
        type: Number,
        required: true,
        default: 5.22
      },
      isBusy: {
        type: Boolean,
        required: false,
        default: false
      },
      skills: {
        frontEnd: {
          type: String[],
          required: false,
          default: ['HTML', 'CSS']
        },
        backEnd: {
          type: String[],
          required: false,
          default: []
        },
        databases: {
          type: String[],
          required: false,
        }
      }
}
export default defineComponent({
  name: 'Card',
  props: ['info'],
  methods:{
    getImage(name: string){
      try{
        return require(`@/assets/${name.toLowerCase()}.png`)
      } catch (e: unknown){
        if (e instanceof Error){
          alert(`aucune image trouvé avec le nom : ${name}`)
          return require('@/assets/no.png')
        }
      }
    }
  }
})
</script>
<style>

  .card-container{
    display: flex;
    gap: 20px;
  }
  .user-card{
    overflow: hidden;
    width: 300px;
    height: 300px;
    border-radius: 8px;
    background-color: var(--bglow);
  }

  .user-card .user-top{
    position: relative;
    height: 110px;
    background-image: url("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2526&q=80");
    /* border-bottom: 1px solid white; */
    background-size: cover;
    background-repeat: no-repeat;
  }

  .tt{
    height: 30px;
    justify-content: space-between;
    display: flex;
    padding: 5px;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .user-top i{
    cursor: pointer;
    color: var(--green);
    font-size: 25px;
  }

  .user-top .status{
    padding: 2px;
    text-align: center;
    vertical-align: middle;
    font-size: 15px;
    border-radius: 5px;
    color: var(--white);
    background-color: var(--green);
  }

  .user-card .user-center{
    height: 140px;
  }

  .user-card .user-bottom{
    /* border-top: 1px solid white; */
    height: 50px;
  }

  .user-icones {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .user-icones i{
    overflow: hidden;
    font-size: 32px;
    margin: 5px;
  }

  .nb-likes{
    font-size: 20px;
    margin-left: 5px;
    color: var(--white);
  }

  .user-icones i{
    cursor: pointer;
  }

  .user-icones a:nth-child(1){
    color: var(--lnblue);
    /* background-color: var(--white); */
  }

  .user-icones a:nth-child(2){
    color: var(--white);
  }

  .user-icones a:nth-child(3){
    color: var(--nanviolet);
  }

  .user-center{
    position: relative;
  }

  .user-center .ct img{
    transform: translateY(-40%);
    min-height: 100px;
    min-width: 100px;
    max-height: 100px;
    max-width: 100px;
    border-radius: 50%;
  }

  .ct{
    display: flex;
    height: 62px;
    gap: 5%;
    justify-content: space-between;
  }

  .ct .fullname{
    font-size: 18px;
    width: max-content;
    height: max-content;
    color: var(--white);
  }

  .spec-logo{
    display: flex;
    justify-content: center;
    height: 78px;
    color: var(--white);
    font-size: 22px;
    align-items: center;
  }

  .spec-logo img {
    height: 25px;
    width: 25px;
    margin-left: 5px;
    color: var(--js);
  }

  .user-card.back{
    color: var(--white);
  }

  .user-card.back p{
    font-size: 20px;
    padding: 5px;
    margin: 5px;
  }

  .skills{
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .skill{
    display: flex;
    align-items: center;
  }

  .skill span{
    margin: 0 8px;
    font-size: 18px;
  }

  .simages{
    overflow: hidden;
    width: 180px;
    height: 44px;
  }

  .simages img{
    width: 40px;
    height: 40px;
  }

  
</style>