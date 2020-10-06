var app = new Vue({ 
    el: '#app',
    data: {
        yearNormal: (new Date().getFullYear()),
        year: (new Date().getFullYear()),
        message: '任意のテキスト',
        answer: 'はい',
        answers: [],
        radio_answer: '選択してください',
        select_answer: '',
        category: [],
        option_bind_answer: '',
        options: [
            {code: 'ans1', label: '初めて'},
            {code: 'ans2', label: '週一回'},
            {code: 'ans3', label: '月2回'},
            {code: 'ans4', label: '半年に一回'},
        ],
    },
    methods: {
        // yearのinputイベントハンドラ
        yearInputHandler: function($event){
            this.year = $event.target.value;
        }
    },
    computed: {
        selection: function() {
            return this.answers.join();
        },
        selectedCategory: function() {
            return this.category.length > 0 ? this.category.join() : '';
        }
    }
})