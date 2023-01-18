import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition: any;
declare var webkitSpeechGrammarList: any;
const SpeechGrammarList = (<any>window).SpeechGrammarList || webkitSpeechGrammarList;

@Injectable({
    providedIn: 'root'
})
export class SmartSpeakerService {

    private recognition: any;
    private commands: any = {};
    private grammar: string = "";

    constructor() {
        this.recognition = new webkitSpeechRecognition();
    }

    public initialize() {
        this.grammar = this.createGrammar();
        let speechRecognitionList = new SpeechGrammarList();
        speechRecognitionList.addFromString(this.grammar, 1);

        this.recognition.grammars = speechRecognitionList;

        this.recognition.lang = 'en-US';

    }

    public start() {
        this.recognition.start();
        this.recognition.onresult = (event: any) => {
            let command = event.results[0][0].transcript;
            console.log("Command given: " + command);
            if (this.commands[command]) {
                this.commands[command]();
            }
        }

        this.recognition.onend = () => {
            this.recognition.start();
        }
    }

    public stop() {
        this.recognition.stop();
    }

    public addCommand(command: string, callback: Function) {
        this.commands[command.toLowerCase()] = callback;
        console.log(this.commands);
    }

    public speak(text: string) {
        let utterance = new SpeechSynthesisUtterance();
        utterance.text = text;
        utterance.voice = speechSynthesis.getVoices()[0];
        utterance.rate = 1;
        utterance.onerror = (event: any) => {
            console.log(event);
        }
        speechSynthesis.speak(utterance);
    }

    private createGrammar() {
        let grammar = '#JSGF V1.0; grammar commands; public <command> = ';
        for (let command in this.commands) {
            grammar += command.split(" ").join(" | ") + ' | ';
        }
        grammar = grammar.slice(0, grammar.length - 3);
        return grammar + ' ;';
    }

}