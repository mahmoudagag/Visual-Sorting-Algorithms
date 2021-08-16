
class Sort{
    constructor(){
        this.root = document.getElementById('container1')
        this.arraySize = 30
        this.width = 1300;
        this.height = 760
        this.array = [];
        this.algo = null
        this.isrunning=false
        this.speed=75
        this.states =[]
        this.stateidx = 1
        this.fillArray(this.array)
        this.eventListerners()
    }

    eventListerners(){
        //changing array size
        document.getElementById('arraySize').addEventListener('input',()=>{
            this.isrunning = false
            document.getElementById('playbutton').classList.replace("buttonplay", "buttonpaused")
            this.changeArraySize(document.getElementById('arraySize').value)
        })

        document.getElementById('insertionSort').addEventListener('click',()=>{
            document.getElementById('sortingAlgorithm').innerHTML="Insertion Sort"
            this.algo="Insertion Sort"
        })
        document.getElementById('mergeSort').addEventListener('click',()=>{
            document.getElementById('sortingAlgorithm').innerHTML="Merge Sort"
            this.algo="Merge Sort"
        })
        document.getElementById('heapSort').addEventListener('click',()=>{
            document.getElementById('sortingAlgorithm').innerHTML="Heap Sort"
            this.algo="Heap Sort"
        })
        document.getElementById('quickSort').addEventListener('click',()=>{
            document.getElementById('sortingAlgorithm').innerHTML="Quick Sort"
            this.algo="Quick Sort"
        })
        document.getElementById('bubbleSort').addEventListener('click',()=>{
            document.getElementById('sortingAlgorithm').innerHTML="Bubble Sort"
            this.algo="Bubble Sort"
        })        
        document.getElementById('selectionSort').addEventListener('click',()=>{
            document.getElementById('sortingAlgorithm').innerHTML="Selection Sort"
            this.algo="Selection Sort"
        })
        /*document.getElementById('radixSort').addEventListener('click',()=>{
            document.getElementById('searchingAlgorithm').innerHTML="Radix Sort"
            this.algo="Radix Sort"
        })*/
        
        document.getElementById('run').addEventListener('click',()=>{
            this.isrunning=false
            if(this.algo){
                this.array = [...this.states[0]]
                this.removeChildren()
                this.createBars()
                this.isrunning=true
                this.restart()
                this.states.push([...this.array])
                document.getElementById('playbutton').classList.replace("buttonpaused", "buttonplay")
                this.run()
                this.show()
            }
        })

        document.getElementById('randomize').addEventListener('click',()=>{
            this.isrunning = false
            this.removeChildren()
            this.restart()
            this.shuffleArray(this.array)
            document.getElementById('playbutton').classList.replace("buttonplay", "buttonpaused")
        })

        document.getElementById('speed').addEventListener('input',()=>this.speed = 150-(document.getElementById('speed').value*25))

        document.getElementById('playbutton').addEventListener('click',()=>{
            if(this.algo){
                this.isrunning = !this.isrunning
                if(this.isrunning){
                    document.getElementById('playbutton').classList.replace("buttonpaused", "buttonplay")
                    if(this.states.length==1){
                        this.run()
                    }
                    this.show() 
                }else{
                    document.getElementById('playbutton').classList.replace("buttonplay", "buttonpaused")
                }
            }        
        })  
        document.getElementById('oneForward').addEventListener('click',()=>{
            if(this.states.length==1){
                this.run()
            }
            if(this.algo && !this.isrunning && this.stateidx!=this.states.length){
                var changes = this.findDifference(this.states[this.stateidx-1],this.states[this.stateidx])
                this.changeBars(changes,this.stateidx)
                this.stateidx +=1
            }
        })
        document.getElementById('oneBackward').addEventListener('click',()=>{
            if(this.states.length==1){
                this.run()
            }
            if(this.algo && !this.isrunning && this.stateidx!=1){
                this.stateidx -=1
                var changes = this.findDifference(this.states[this.stateidx-1],this.states[this.stateidx])
                this.changeBars(changes,this.stateidx-1)
            }
        })
        document.getElementById('jumpStart').addEventListener('click',()=>{
            if(this.states.length==1){
                this.run()
            }
            if(this.algo && !this.isrunning){
                var changes = this.findDifference(this.states[this.stateidx-1],this.states[0])
                this.stateidx =1
                this.changeBars(changes,0)
            }
        })
        document.getElementById('jumpEnd').addEventListener('click',()=>{
            if(this.states.length==1){
                this.run()
            }
            if(this.algo && !this.isrunning && this.stateidx!=this.states.length){
                var changes = this.findDifference(this.states[this.stateidx],this.states[this.states.length-1])
                this.stateidx = this.states.length-1
                this.changeBars(changes,this.stateidx)
            }
        })
    }

    restart(){
        this.states = []
        this.stateidx = 1
    }

    createBars(){
        var bar
        for(var i=0;i<this.arraySize;i++){
            bar = document.createElement("div")
            bar.id = i
            bar.className= "bar"
            bar.style.borderBottomRightRadius="20px"
            bar.style.borderBottomLeftRadius="20px"
            bar.style.width = `${this.width/this.arraySize}px`
            bar.style.height = `${this.findHeight(this.array[i])}px`
            this.root.appendChild(bar)
        }
    }

    changeArraySize(n){
        this.arraySize=n
        this.array=[]
        this.restart()
        this.removeChildren()
        this.fillArray(this.array)
    }

    fillArray(array){
        for(var i=0;i<this.arraySize;i++){
            array.push(i+1)
        }
        this.shuffleArray(array)
    }

    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        this.states.push([...this.array])
        this.createBars()
    }

    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    findHeight(val){
        return (this.height/2)*(1+val/this.arraySize)
    }
    removeChildren(){
        while(this.root.firstChild){
            this.root.removeChild(this.root.firstChild)
        }
    }
    async run(){
        if(this.algo =="Insertion Sort"){
            this.insertionSort()
        }else if(this.algo == "Merge Sort"){
            this.mergeSort(this.array,0,this.arraySize-1)
        }else if(this.algo =="Heap Sort"){
            this.heapSort(this.array)
        }else if(this.algo =="Quick Sort"){
            this.quickSort(this.array,0,this.arraySize-1)
        }else if(this.algo == "Bubble Sort"){
            this.bubbleSort(this.array)
        }else if(this.algo == "Selection Sort"){
            this.selectionSort(this.array)
        }else if(this.algo == "Radix Sort"){
            this.radixSort(this.array)
        }
    }
    async show(){
        var i
        while(this.states.length != this.stateidx && this.isrunning){
            i =this.stateidx;
            var changes = this.findDifference(this.states[i-1],this.states[i])
            await this.timeout(this.speed);
            this.changeBars(changes,i)
            this.stateidx +=1
        }
        this.isrunning=false
        document.getElementById('playbutton').classList.replace("buttonplay", "buttonpaused")
    }
    findDifference(prev,curr){
        var arr = []
        for(var i =0;i<prev.length;i++){
            if (prev[i]!=curr[i]){
                arr.push(i)
            }
        }
        return arr
    }
    changeBars(arr,i){
        for(var j=0;j<arr.length;j++){
            document.getElementById(`${arr[j]}`).style.height = `${this.findHeight(this.states[i][arr[j]])}px`
        }
    }

    insertionSort(){
        for(var i=0;i<this.arraySize;i++){
            var key = this.array[i]
            var j= i-1
            while (j>=0 && this.array[j]>key){
                var tmp = this.array[j+1]
                this.array[j+1] = this.array[j]
                this.array[j] = tmp
                this.states.push([...this.array])
                j-=1
            }
        }
        console.log(this.array)
    }
    mergeSort(arr,left,right){
        if (left<right){
            var mid =Math.floor((left+right)/2)
            this.mergeSort(arr, left, mid)
            this.mergeSort(arr,mid+1,right)
            this.Merge(arr,left,mid,right)
        }
    }
    Merge(arr,left,mid,right){
        var L=[]
        var R=[]
        for(var i=left;i<mid+1;i++){ L.push(arr[i]) }
        for(var i=mid+1;i<right+1;i++){ R.push(arr[i]) }
        L.push(Infinity)
        R.push(Infinity)
        console.log(L)
        var i = 0
        var j = 0
        for(var k=left;k<right+1;k++){
            if( L[i]<= R[j]){
                arr[k]= L[i]
                i+=1
            }else{
                arr[k]=R[j]
                j+=1
            this.states.push([...this.array])
            }
        }
    }

    heapSort(arr){
        this.buildHeap(arr)
        var tmp
        for(var i=arr.length-1;i>0;i--){
            tmp =arr[i]
            arr[i]=arr[0]
            arr[0] =tmp
            this.states.push([...this.array])
            this.heapify(arr,i,0)
        }
    }
    buildHeap(arr){
        for(var i=Math.floor(arr.length/2);i>-1;i--){
            this.heapify(arr,arr.length,i)
        }
    }
    heapify(arr,n,i){
        var largest = i  
        var l = 2 * i + 1  
        var r = 2 * i + 2    
    
        if (l < n && arr[largest] < arr[l]){ largest = l }
    
        if (r < n && arr[largest] < arr[r]){ largest = r }
    
        if (largest != i){
            var tmp = arr[i]
            arr[i]= arr[largest]
            arr[largest]=tmp
            this.states.push([...this.array])
            this.heapify(arr, n, largest)
        }
    }
    
    quickSort(arr,p,r){
        var q
        if (p<r){
            q = this.partition(arr,p,r)
            this.quickSort(arr,p,q-1)
            this.quickSort(arr,q+1,r)
        }
    }
    partition(arr,p,r){
        var x = arr[r]
        var i=p-1
        var tmp
        for(var j=p;j<r;j++){
            if(arr[j]<=x){
                i+=1
                tmp =arr[i]
                arr[i]=arr[j]
                arr[j] =tmp
                this.states.push([...arr])
            }
        }
        tmp =arr[i+1]
        arr[i+1]=arr[r]
        arr[r]=tmp
        this.states.push([...arr])
        return i+1
    }
    bubbleSort(arr){
        var tmp
        for(var i=0;i<arr.length;i++){
            for(var j=0;j<arr.length-i-1;j++){
                if (arr[j]>arr[j+1]){
                    tmp = arr[j]
                    arr[j]=arr[j+1]
                    arr[j+1]=tmp
                    this.states.push([...arr])     
                }   
            }
        }
    }
    selectionSort(arr){
        var min,tmp
        for(var i=0;i<arr.length-1;i++){
            min=i
            for(var j=i+1;j<arr.length;j++){
                if (arr[j]<arr[min]){ min=j }
            }
            tmp=arr[i]
            arr[i]=arr[min]
            arr[min]=tmp
            if(min!=i){ this.states.push([...arr]) }
        }
    }
    /*radixSort(arr){
        var maximum = this.arraySize
        console.log(maximum)
        var exp=1
        while (Math.floor(maximum/exp)>0){
            arr = this.countingSort(arr,exp)
            exp *=10
        }
        console.log(this.array)
    }
    countingSort(arr,exp){
        var idx
        var length = arr.length
        var B = []
        for(var i=0;i<length;i++){ B.push(0) }
        var C = []
        for(var i=0;i<10;i++){ C.push(0) }
        for(var i=0;i<length;i++){
            idx =arr[i]/exp
            C[Math.round(idx%10)]+=1
        }
        for(var i=1;i<10;i++){
            C[i]+=C[i-1]
        }
        for(var j=length-1;j>-1;j--){
            idx = arr[j]/exp
            B[ C[Math.round(idx%10)] -1]=arr[j]
            C[Math.round(idx%10)]-=1
        }
        console.log(B)
        return B
    }*/
}
window.onload = ()=>{
    const s = new Sort()
}