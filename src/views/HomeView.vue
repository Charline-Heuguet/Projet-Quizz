<template>
    
    <div class="questions"  >

        <!-- Ici, wincount et loseCount sont les props de ScoreBoard donc on les importe ici par ce biais et on les dynamise grâce a la propriété de données  -->
      <ScoreBoard :winCount="this.winCount" :loseCount="this.loseCount" />

      <template v-if="this.question">
        

        <h1 v-html="this.question"></h1>

        <template v-for="answer in answers">
          <!--:disabled="this.answerSubmitted" est pour desactivé les boutons radios quand answerSubmitted est à TRUE-->
          <input 
          :disabled="this.answerSubmitted" 
          type="radio" 
          name="options" 
          :value="answer"
          v-model="this.chosenAnswer">
          <label v-html="answer"></label><br>
        </template>
        
        <!-- On montre le bouton SEND que si la réponse n'a PAS été soumise -->
        <button 
        @click="this.submitAnswer()" 
        v-if="!this.answerSubmitted" 
        class="send" 
        type="button">Send</button>

        <!-- On ne montre cet élément que si answerSubmitted (la réponse qui a été soumise) est true => l'état passe de false a true au clic sur le bouton "send" -->
        <section v-if="this.answerSubmitted" class="result">

          <h4
          v-if="this.chosenAnswer == this.correctAnswer"
          v-html=" 'Bien joué. La réponse correcte est bien ' + correctAnswer + ' !' ">
          </h4>

          <h4 v-else 
          v-html=" 'Désolé, vous avez choisi la mauvaise réponse. La réponse correcte était ' + correctAnswer + ' .'">
          </h4>
          <button 
          @click="this.getNewQuestion()" 
          class="send" 
          type="button"
          >Prochaine question</button>
        </section>

      </template>
  
    </div>

</template>


<script>
import ScoreBoard from '../components/ScoreBoard.vue';
//DOCUMENTATION : https://www.npmjs.com/package/vue-axios

export default{
    name: "HomeView",
    components: {ScoreBoard},

    data() {
        return {
            question: "",
            incorrectAnswers: [],
            correctAnswer: "",
            chosenAnswer: "",
            answerSubmitted: false,
            winCount : 0,
            loseCount: 0,


        };
        // answerSubmitted : false car à la base, aucune réponse n'est soumise donc la propriété de données est à FALSE
    },
    // "var answers = JSON.parse(JSON.stringify(this.incorrectAnswers) )" crée une copie de la liste incorrectAnswers en utilisant la méthode JSON.stringify() pour la convertir en une chaîne de caractères JSON, puis la méthode JSON.parse() pour la convertir en un tableau JavaScript.
    // La raison pour laquelle une copie est créée plutôt qu'une référence directe à this.incorrectAnswers est qu'il est généralement recommandé de ne pas modifier directement les propriétés de données dans Vue.js, car cela peut provoquer des effets secondaires indésirables.
    // En créant une copie de la liste incorrectAnswers, on évite de modifier l'objet original et on peut y ajouter l'élément correctAnswer sans affecter la liste originale.
    // En somme, cette ligne de code permet de créer une liste answers qui contient toutes les réponses possibles à la question, y compris la réponse correcte. Cette liste est utilisée dans le template pour afficher les différentes réponses à l'utilisateur.
    computed: {
        answers() {
            var answers = JSON.parse(JSON.stringify(this.incorrectAnswers));
            console.log(answers);
            // splice(position voulue, nbASupprimer, reponse correcte )
            answers.splice(Math.round(Math.random() * answers.length), 0, this.correctAnswer);
            // La méthode Math.random() génère un nombre décimal aléatoire compris entre 0 et 1.
            //En multipliant ce nombre par la longueur du tableau "answers" et en arrondissant le résultat à l'entier le plus proche avec Math.round(), on obtient un index aléatoire dans answers.
            return answers;
        }
    },
    methods: {
        // Le bouton SEND du formulaire.
        submitAnswer() {
            if (!this.chosenAnswer) {
                alert("Vous devez choisir une réponse !");
            }
            else {
                // il faut mettre les réponses soumises à True
                this.answerSubmitted = true;
                if (this.chosenAnswer == this.correctAnswer) {
                    this.winCount++;
                }
                else {
                    this.loseCount++;
                }
            }
            //on STOCKE les score dans le LS ("clé", la valeur.)
            localStorage.setItem('winCount', this.winCount);
            localStorage.setItem('loseCount', this.loseCount);
        },
        getNewQuestion() {
            //On doit redefinir qqs ppt de données:
            this.answerSubmitted = false; //on doit repasser l'etat de true à false apres la soumiss° de la réponse => cela recachera la section bonne/mauvaise reponse.
            this.chosenAnswer = "";
            this.question = "";
            this.axios
                .get("https://opentdb.com/api.php?amount=1&category=15")
                .then((response) => {
                this.question = response.data.results[0].question;
                this.incorrectAnswers = response.data.results[0].incorrect_answers;
                this.correctAnswer = response.data.results[0].correct_answer;
            });
        }
    },
    created() {
        this.getNewQuestion();

        //et à la création du composant on RECUPERE les scores dans le LS qui a la clé
        // Littérairement, cela signifie "Récupérer les scores du localStorage ou initialiser à 0"     
        this.winCount = localStorage.getItem('winCount') || 0 ;
        this.loseCount = localStorage.getItem('loseCount') || 0;



        // this.axios
        // .get("https://opentdb.com/api.php?amount=1&category=15")
        // .then((response) => {
        //   this.question = response.data.results[0].question;
        //   this.incorrectAnswers = response.data.results[0].incorrect_answers;
        //   this.correctAnswer = response.data.results[0].correct_answer;
        // })
    },

}

//API Utilisée :  https://opentdb.com/api.php?amount=1&category=15
</script>




<style>
#app{
  max-width: 960px;
}

input{
  margin: 12px 4px;
}

button.send{
  margin-top: 12px;
  height: 40px;
  min-width: 120px;
  padding: 0 16px;
  color: #fff;
  background-color: #1867c0;
  border: 1px solid #1867c0;
  cursor: pointer;
}
</style>
