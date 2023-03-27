<template>
    <section class="score">
        Player <span>{{this.winCount}}</span> x <span>{{ this.loseCount }}</span> Computer
    </section>

</template>

<script>
// On met les propriétés de données là où on controle si les reponses sont bonnes ou pas donc dans homeview
export default{
    name: 'ScoreBoard',
    props:[ 
        'winCount',
        'loseCount'
    ]
// on peut très bien ecrire à la place - c'est pareil:
    // props: {
    //     winCount: Number,
    //     loseCount: Number,
    // }
    
    
    
}
</script>

<style>

.score{
    border-bottom: 1px solid black;
    padding: 25px;
    font-size: 18px;
}

span{
    border: 1px solid black;
    padding: 15px;    
    font-weight: bold;
}

</style>