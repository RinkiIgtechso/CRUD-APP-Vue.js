<template>
  <div class="about">
    <div>
      <div class="output">
        <div class="outputCalc">{{ previousCalculatorValue ? previousCalculatorValue : calculatorValue }}</div>
      </div>
      <div class="buttons output">
        <div class="button" 
          v-for="n in btnArr" 
          :class="{ operator: ['C', '*', '/', '-', '+', '%', '=','CE'].includes(n) }" 
          :key="n"
        >
          <div class="btn" @click="action(n)">{{ n }}</div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default{
  name: "AboutView",
  data(){
    return{
      btnArr: [
        "C",
        "*",
        "/",
        "-",
        "7",
        "8",
        "9",
        "+",
        "4",
        "5",
        "6",
        "%",
        "1",
        "2",
        "3",
        "=",
        "0",
        ".",
        "CE"
      ],
      operator: null,
      calculatorValue: '',
      previousCalculatorValue: "",
    }
  },
  methods:{
    action(n){
      this.previousCalculatorValue = this.previousCalculatorValue + n;
      if(n==="CE"){
        this.previousCalculatorValue = this.previousCalculatorValue.slice(0, -3)
      }
      if(this.calculatorValue && n){
        if(n==='CE'){
          this.previousCalculatorValue = String(this.calculatorValue).slice(0, -1)
        }else{
          this.previousCalculatorValue = this.calculatorValue + n;
        }
        this.calculatorValue = ''
      }
      if(n==="="){
        let arr = this.previousCalculatorValue.split("=");
        this.calculatorValue = eval(arr[0]);
        this.previousCalculatorValue = '';
      }
      if(n==="C"){
        this.previousCalculatorValue = '';
        this.calculatorValue = '';
      }
    }
  }
}
</script>

<style scoped>
.about{
  text-align: center;
  margin: 4rem 3rem;
}
.about>div{
  width: 30%;
  margin: auto;
  margin-bottom: 5.6rem;
}
.output{
  border: 0.5px solid rgb(255, 198, 124);
  border-radius: 4px;
  padding: 5px;
  background-color: antiquewhite;
  box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.008),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.012),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.015),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.018),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.022),
    100px 100px 80px rgba(0, 0, 0, 0.03);
    margin-bottom: 20px;
}
.outputCalc{
  background-color: rgb(255, 209, 148);
  padding: 15px;
  border-radius: 3px;
}
.buttons{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.button{
  padding: 10px;
  background: rgb(255, 209, 148);
  border-radius: 4px;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
}
.operator {
  background-color: rgb(238, 167, 75);
  color: #000;
}
.operator:hover {
  background-color: rgb(255, 209, 148);
}
</style>
