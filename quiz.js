(() => {
    const selectors = {
        qtnContainerSelector: '.wrapper',
        awsSelector: '.aws',
        resetButtonSelector: '.btn',
    };

    const quiz = () => {
        const init = () => {
            const questions = document.querySelectorAll(selectors.qtnContainerSelector);
            questions?.forEach((qtn) => {
                const answers = qtn.querySelectorAll(selectors.awsSelector);
                answers?.forEach((aws) => {
                    const rightAws = qtn.querySelector('[data-right]');
                    aws.addEventListener('click', () => {
                        if(!qtn.hasAttribute("data-done")){       
                            if(aws.hasAttribute("data-right")){
                                aws.classList.add("right");
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
        };
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
			window.scrollTo({ top: 0, behavior: 'smooth' });
        }

		const reorderQuestions = (questions) =>{
			const $body = document.querySelector("body");
			const $h1 = $body.firstElementChild;
			const $button = $body.lastElementChild;
			$body.innerHTML = "";
			$body.appendChild($h1);
			questions = Array.from(questions).sort(() => Math.random() - 0.5);
			questions?.forEach(qtn => {
				$body.appendChild(qtn);
		    });
			$body.appendChild($button);
			
		};
        init();
    };
    document.addEventListener('DOMContentLoaded', quiz);
})();