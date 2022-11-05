<template>
  <div class="home">
    <body>
      <form class="container">
        <div class="form" style="color: #fff; margin-top: 30px;">
          <h2 align="center">INFORMATIONS DU NANIEN</h2>
          <div class="main-content" align="center" style="margin-top: 10px;">
            <input type="text" name="fullName" id="" placeholder="nom complet" required v-model="info.fullName">
            <input type="text" name="email" id="" placeholder="email @" required v-model="info.email">
            <input type="number" name="age" id="" placeholder="age" required v-model="info.age">
            <input type="text" name="phoneNumber" id="" placeholder="Numero de téléphone" required v-model="info.phoneNumber">
            <!-- <input type="text" name="generation" id="" placeholder="Génération (ex : 5.22 ou 4.21)" required v-model="info.generation"> -->
            <select name="generation" style="cursor: pointer;" required v-model="info.generation">
              <option value="" disabled selected="true">Choisir la promotion</option>
              <option :value="1.18">1.18</option>
              <option :value="2.19">2.19</option>
              <option :value="3.20">3.20</option>
              <option :value="4.21">4.21</option>
              <option :value="5.22">5.22</option>
            </select>
            <select name="speciality" style="cursor: pointer;" required v-model="info.speciality">
              <option value="no" disabled selected="true">Choisir la spécialité</option>
              <option value="javascript">Javascript</option>´
              <option value="python">Python</option>
              <option value="C#">C#</option>
              <option value="flutter">Flutter</option>
              <option value="PHP">PHP</option>
              <option value="front-end">Front-end</option>
              <option value="multimedia">Multimédia</option>
            </select>
            <select name="isBusy" style="cursor: pointer;" required v-model="info.isBusy">
              <option value="" disabled selected="true">Choisir la disponibilité</option>
              <option :value="false">libre</option>
              <option :value="true">travail déjà</option>
            </select>
            <select name="gender" style="cursor: pointer;" required v-model="info.gender">
              <option value="" disabled selected="true">Choisir son genre</option>
              <option value="M">homme</option>
              <option value="F">femme</option>
            </select>
            <input type="text" name="profilUrl" id="" placeholder="photo de profil " required v-model="info.profilUrl">
            <input type="text" name="githubUrl" id="" placeholder="lien du profile github" required v-model="info.githubUrl">
            <input type="text" name="linkedinUrl" id="" placeholder="lien de profile linkedin" required v-model="info.linkedinUrl">
            <input type="text" name="portfolioUrl" id="" placeholder="lien du portfolio" v-model="info.portfolioUrl">
          </div>

          <h2 align="center" style="margin-top: 10px;">COMPETENCES DU NANIENS</h2>
          <div class="main-content s"  style="margin-top: 10px;">
            <h4 align=center>Front-end</h4>
            <input type="text" name="frontEnd" id="" placeholder="délimité par une virgule (react, vue etc...)" @keydown="skill" @change="end">
            <div class="lss">
              <span v-for="fe in info.skills.frontEnd"
                >
                  {{ fe }}
              </span>
            </div>
            <h4 align=center>Back-end</h4>
            <input type="text" name="backEnd" id="" placeholder="délimité par une virgule (laravel, django, expressjs etc...)" @keydown="skill" @change="end">
            <div class="lss">
              <span v-for="be in info.skills.backEnd"
                >
                  {{ be }}
              </span>
            </div>
            <h4 align=center>Base de données</h4>
            <input type="text" name="databases" id="" placeholder="délimité par une virgule (mysql, mongodb, postgresql etc...)" @keydown="skill" @change="">
            <div class="lss">
              <span v-for="db in info.skills.databases"
                >
                  {{ db }}
              </span>
            </div>
            <input type="submit" value="soumettre" @click.prevent="submit">
          </div>
        </div>
        <div style="text-align: center">
          <p align="center">
            <h4 style="color: var(--white); padding: 10px;">RETROUVER MES DONNEES</h4>
            <input type="email" name="" id="" style="width: 300px" v-model="email" placeholder="addresse email">
            <input type="submit" value="retrouver" style="width: 100px; margin-left: 5px;" @click.prevent="retrieve">
          </p>
          <div>
            <Card :info="info"/>
          </div>
        </div>

      </form>
  </body>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Card from "@/components/Card.vue"

export default defineComponent({
  name: 'Home',
  components: {
    Card
  },
  data(){
    return {
      info: {
        fullName: 'nom complet',
        speciality: 'no',
        email: '',
        gender: 'M',
        age: '',
        profilUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80',
        linkedinUrl: '',
        githubUrl: '',
        portfolioUrl: '',
        phoneNumber: '',
        generation: '',
        isBusy: '',
        skills: {
          frontEnd: [] as String[],
          backEnd: [] as String[],
          databases: [] as String[]
        }
      },
      inter:{},
      email: ''
    }
  },
  methods:{
    retrieve(){
      console.log(this.info)
      fetch(`/api/retrieve/${this.email}`)
      .then(res => res.json())
      .then(data => {
        if (!data.message){
          alert("Aucune information trouvée avec ce mail ...")
        }else{
          const retrieved = {...data.message}
          delete retrieved?.createdAt
          delete retrieved?.updatedAt
          delete retrieved?.__v
          this.info = {...data.message}
          this.inter = {...this.info}
          alert("retrouvé avec succèss")
        }
      })
    },
    submit(){
      const message = `
        cette action écrasera vos données si elle existe.
        si vous voulez effectuer une modification merci de
        retrouver vos informations avant.
        voulez vous continuer ?
      `
      if (window.confirm(message))
      fetch('/api/add', {
        method: 'POST',
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify(this.info)
      })
      .then(res => res.json())
      .then(data => alert(JSON.stringify(data)))
    },
    skill(e: KeyboardEvent){
      type keys = keyof typeof this.info.skills
      const target = e.target as HTMLInputElement
      const property = target.name as keys
      if (e.key === ','){
        this.info.skills[property] =  [...target.value.trim().split(',').filter(n => n)]
      }
    },
    end(e: Event){
      type keys = keyof typeof this.info.skills
      const target = e.target as HTMLInputElement
      const property = target.name as keys
      this.info.skills[property] =  [...target.value.trim().split(',').filter(n => n)]
    }
  },
  watch:{
    inter(){
      const allinp = document.querySelectorAll(".main-content.s input[type='text']")
      Array.from(allinp).map(input => {
        if (input instanceof HTMLInputElement){
          type names = keyof typeof this.info.skills
          const name = input.name as names
          input.value = this.info.skills[name].join(',')
        }
      })
    }
  }
});
</script>

<style>
.container{
  gap: 15%;
  min-height: 900px;
  align-items: center;
  justify-content: center;
  display: flex;
}

.form{
  position: relative;
  max-width: 800px;
}

.main-content{
  display: flex;
  flex-wrap: wrap;
  width: 850px;
  flex-direction: row;
}

.main-content *{
  margin: 10px;
}

select,
input{
  border-radius: 5px;
  padding: 10px;
  width: 400px;
  font-size: 20px;
}

.resume p{
  padding: 10px;
  margin: 20px;
}

.lss{
  margin: 0;
}

.lss span{
  padding: 3px;
  border-radius: 8px;
  background-color: var(--white);
  color: var(--bg);
}

.main-content.s{
  align-items: center;
  flex-direction: column;
  text-align: center;
}

input[type="submit"]{
  border-radius: 8px;
  margin: 10px;
  background-color: var(--white);
  color: var(--bg);
  cursor: pointer;
  width: 150px;
}

input[type="submit"]:hover{
  background-color: rgb(169, 165, 165);
  color: var(--white);
}
</style>