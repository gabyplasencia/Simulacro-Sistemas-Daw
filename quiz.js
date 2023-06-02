(() => {
    const selectors = {
        qtnContainerSelector: '.wrapper',
        awsSelector: '.aws',
        resetButtonSelector: '.btn',
        containerSelector:'.container',
        resultSelector: '.result',
        resultTotalSelector: '.total',
        resultScoreSelector: '.score'
    };

    const quiz = () => {
        const init = () => {
            const questions = document.querySelectorAll(selectors.qtnContainerSelector);
            let result = document.querySelector(selectors.resultSelector)
            let score = result.querySelector(selectors.resultScoreSelector)
            questions?.forEach((qtn) => {
                const answers = qtn.querySelectorAll(selectors.awsSelector);
                answers?.forEach((aws) => {
                    const rightAws = qtn.querySelector('[data-right]');
                    aws.addEventListener('click', () => {
                        if(!qtn.hasAttribute("data-done")){       
                            if(aws.hasAttribute("data-right")){
                                aws.classList.add("right");
                                let current = parseInt(score.innerText);
                                current++
                                score.innerText = current
                            }else{
                                aws.classList.add("incorrect");
                                rightAws.classList.add("right")
                            }
                            qtn.dataset.done = true;
                        }
                    })
                }); 
            })
            const btn = document.querySelector(selectors.resetButtonSelector);
            if(btn){
                btn.addEventListener('click', () => {
                    cleanQuestions(questions);
                })
            }
            initResultTotal(questions)
        };
        const initResultTotal = (questions) => {
            let result = document.querySelector(selectors.resultSelector)
            let total = result.querySelector(selectors.resultTotalSelector)
            total.innerText = questions.length
        }
        const cleanQuestions = (questions) =>{
            questions?.forEach((qtn) =>{
                qtn.removeAttribute("data-done");
                const answers = qtn.querySelectorAll(selectors.awsSelector);
                answers?.forEach((aws) => {
                    aws.classList.remove("right");
                    aws.classList.remove("incorrect");
                }); 
            });
			reorderQuestions(questions);
            clearScore()
			window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        const clearScore = () => {
            let result = document.querySelector(selectors.resultSelector)
            let score = result.querySelector(selectors.resultScoreSelector)
            score.innerText = 0
        }
		const reorderQuestions = (questions) =>{
			const container = document.querySelector(selectors.containerSelector);
			const $button = container.lastElementChild;
            const result = container.querySelector(selectors.resultSelector)
			container.innerHTML = "";
			questions = Array.from(questions).sort(() => Math.random() - 0.5);
			questions?.forEach(qtn => {
				container.appendChild(qtn);
		    });
            container.appendChild(result)
			container.appendChild($button);
			
		};
        init();
    };
    document.addEventListener('DOMContentLoaded', quiz);
})();