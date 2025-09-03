import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const messages = [
    {
        "que": "How do I start a campaign?",
        "ans": "Simply set a funding goal, choose a deadline, and create your campaign on-chain."
    },
    {
        "que": "How do supporters fund a campaign?",
        "ans": "Supporters send ETH directly to the campaign contract. Each donation is securely recorded on-chain."
    },
    {
        "que": "What happens if the campaign reaches its goal before the deadline?",
        "ans": "The campaign is marked as successful, and the creator can withdraw the collected funds."
    },
    {
        "que": "What if the campaign doesn’t reach its goal?",
        "ans": "The campaign is marked as failed, and supporters can withdraw their ETH back."
    },
    {
        "que": "Can the campaign owner withdraw funds before reaching the goal?",
        "ans": "No, funds remain locked until the campaign is successful."
    },
    {
        "que": "Is my contribution locked forever?",
        "ans": "No, if the campaign fails, you can withdraw your ETH anytime after it closes."
    },
    {
        "que": "Are all transactions transparent?",
        "ans": "Yes, all donations and withdrawals are recorded on the blockchain for full transparency."
    }
];


const Section5 = () => {
    return (
        <div>
            <div className=" space-y-4 ">
                <h1 className='md:px-10 sm:text-3xl text-xl font-bold'>Guidelines & Help</h1>
                {
                    messages.map((message) => (
                        <div className='md:px-24 '>
                            <div className='border-b-2'>
                                <Accordion type="single" collapsible >
                                    <AccordionItem value="item-1" className={" "}>
                                        <AccordionTrigger className='md:text-2xl text-lg'>{message?.que}</AccordionTrigger>
                                        <AccordionContent className={'md:text-lg'}>
                                          {message?.ans}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Section5