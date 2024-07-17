import {Node} from '../linkedlist/linkedlist.mjs'

class HashMap {

    constructor(){
        this.capacity = 16;
        this.loadfactor = .75;
        this.array = Array(this.capacity);
        this.size = 0;
    }

    hash(key) {
        let constant = .69;
        let table_size = this.capacity;
        let hashcode = 0;
        for(let i = 0; i < key.length; i++){
            hashcode += Math.floor(table_size * (key.charCodeAt(i) % constant));
        }
        hashcode = hashcode % this.capacity;

        return hashcode;
    }

    set(key, value){
        let bucket = this.hash(key);
        //creating linked list in case of collision
        let node = new Node();
        node.key = key;
        node.value = value;
        if(this.array[bucket] != null){
            let curNode = this.array[bucket];
            if(curNode.key !== node.key){
                this.size++;
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
            this.size++;
        }
        
    }
    get(key) {
        let bucket = this.hash(key);
        if(this.array[bucket] !== undefined) {
            let curNode = this.array[bucket];
            if(curNode.key === key){
                return curNode.value;
            }
            else {
                while(curNode.key !== key) {
                    curNode = curNode.nextNode;
                }
                return curNode.value;
            }
        }
        if(this.array[bucket] === undefined) {
            return null;
        }

    }

    has(key) {
        return Boolean(this.get(key));
    }

    remove(key) {
        let bucket = this.hash(key);
        if(this.array[bucket] !== undefined) {
            this.size--;
            if(this.array[bucket].nextNode === null) {
                this.array[bucket] = undefined;
                return true
            }
            else if(this.array[bucket].key === key) {
                this.array[bucket] = this.array[bucket].nextNode;
                return true;
            }

            else {
                let curNode = this.array[bucket];
                while(curNode.nextNode !== null && curNode.nextNode.key !== key) {
                    curNode = curNode.nextNode;
                    
                }
                let deleteNode = curNode.nextNode;
                let afterDelete = deleteNode.nextNode;
                curNode.nextNode = afterDelete;
                deleteNode.nextNode = null;
                return true
            }   
        }
        else {
            return false;
        }
    }
    length(){
        return this.size;
    }
    
    clear(){
        this.array = Array(this.capacity);
        this.size = 0;
    }

    keys() {
        let keys = [];
        for(let i = 0; i < this.array.length; i++) {
            let curNode = this.array[i];
            if(curNode !== undefined) {
                while(curNode.nextNode !== null){
                    keys.push(curNode.key);
                    curNode = curNode.nextNode;
                }
                keys.push(curNode.key);
            }
            
        }
        return keys;
    }
    values(){
        let values = [];
        for(let i = 0; i < this.array.length; i++) {
            let curNode = this.array[i];
            if(curNode !== undefined) {
                while(curNode.nextNode !== null){
                    values.push(curNode.value);
                    curNode = curNode.nextNode;
                }
                values.push(curNode.value);
            }
            
        }
        return values;
    }

    entries(){
        let entries = [];
        for(let i = 0; i < this.array.length; i++) {
            let curNode = this.array[i];
            if(curNode !== undefined) {
                while(curNode.nextNode !== null){
                    entries.push([curNode.key, curNode.value]);
                    curNode = curNode.nextNode;
                }
                entries.push([curNode.key, curNode.value]);
            }
            
        }
        return entries;
    }

}

let hash = new HashMap();
hash.set("test", "apple");
hash.set("test", "bannana");
hash.set("fruit", "apple");
hash.set("blest", "test");
hash.set("lest", "test1");
hash.keys();

console.log(hash.entries());