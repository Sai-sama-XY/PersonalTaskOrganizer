import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { Stepper } from './stepper'

function InProg() {

    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { title: "Step 1", description: "Create your account" },
        { title: "Step 2", description: "Verify your email" },
        { title: "Step 3", description: "Add your details" },
        { title: "Step 4", description: "Confirm and finish" },
    ];
  return (
    <Card>
    <CardHeader>
        <CardTitle>IN PROGRESS</CardTitle>
    </CardHeader>
    <CardContent>
        <Stepper
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
        ></Stepper>
    </CardContent>
</Card>
  )
}

export default InProg