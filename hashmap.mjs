import {Node} from '../linkedlist/linkedlist.mjs'

class HashMap {

    constructor(){
        this.capacity = 16;
        this.loadfactor = .75;
        this.array = Array(this.capacity);
    }

    hash(key) {
        let constant = .69;
        let table_size = this.capacity;
        let hashcode = 0;
        for(let i = 0; i < key.length; i++){
            hashcode += Math.floor(table_size * (key.charCodeAt(i) % constant));
        }

        return hashcode;
    }

    set(key, value){
        let bucket = this.hash(key) % this.capacity;
        //creating linked list in case of collision
        let node = new Node();
        node.key = key;
        node.value = value;
        if(this.array[bucket] != null){
            let curNode = this.array[bucket];
            if(curNode.key !== node.key){
                while(curNode.nextNode !== null){
                    curNode = curNode.nextNode;
                }
                curNode.nextNode = node;
            }
            else {
                curNode.value = node.value;
            }
        }
        else {
            this.array[bucket] = node;
        }

    }
    get(key) {
        
    }

    has(key) {
        let bucket = this.hash(key);
        if (this.array[bucket] === undefined) {
            return false;
        }
        else {
            return true;
        }
    }

    remove(key) {

    }
    
}

let hash = new HashMap();
hash.set("test", "apple");
hash.set("test", "bannana");
hash.set("fruit", "apple");
hash.set("blest", "test");
hash.set("lest", "test");

console.log(hash.array); 