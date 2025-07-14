import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
// @ts-ignore
import PptxGenJS from 'pptxgenjs';

interface AppInfo {
  name: string;
  logo: string;
  problemStatement: string;
  solution: string;
  features: string[];
  targetAudience: string;
  howItWorks: string[];
}

const PresentationGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Automatically collected app information
  const appInfo: AppInfo = {
    name: "WellnessTracker",
    logo: "🏃‍♂️",
    problemStatement: "Many people struggle to maintain consistent wellness habits and track their daily health metrics effectively. Lack of motivation, poor tracking tools, and disconnected health data make it difficult to achieve fitness and wellness goals.",
    solution: "WellnessTracker is a comprehensive wellness platform that combines workout tracking, nutrition monitoring, and activity logging in one intuitive app. It provides users with personalized goals, progress visualization, and motivational features to maintain healthy habits.",
    features: [
      "🏋️ Workout Session Tracking with custom timers",
      "💧 Water Intake Monitoring with daily goals",
      "🍎 Nutrition & Calorie Tracking",
      "👟 Daily Step Counter & Activity Monitoring", 
      "📊 Progress Visualization & Analytics",
      "🎯 Personalized Daily Goals",
      "🔐 Secure User Authentication",
      "📱 Responsive Mobile-First Design",
      "☀️ Weather Integration for outdoor activities"
    ],
    targetAudience: "Health-conscious individuals, fitness enthusiasts, people looking to develop better wellness habits, and anyone wanting to track their daily health metrics in one centralized platform.",
    howItWorks: [
      "1. Sign up and complete onboarding to set personal goals",
      "2. Log daily activities: workouts, water intake, meals, and steps",
      "3. View real-time progress through interactive dashboards",
      "4. Track trends and achievements over time",
      "5. Stay motivated with goal completion and streak tracking"
    ]
  };

  const generatePresentation = async () => {
    setIsGenerating(true);
    
    try {
      const pres = new PptxGenJS();
      
      // Set presentation properties
      pres.layout = 'LAYOUT_WIDE';
      pres.author = 'WellnessTracker Team';
      pres.company = 'WellnessTracker';
      pres.subject = 'WellnessTracker App Presentation';
      pres.title = 'WellnessTracker - Your Complete Wellness Solution';

      // Slide 1: Title Slide
      const slide1 = pres.addSlide();
      slide1.background = { fill: 'hsl(222.2, 84%, 4.9%)' };
      
      slide1.addText(appInfo.name, {
        x: 1, y: 2, w: 10, h: 1.5,
        fontSize: 48, bold: true, color: 'hsl(210, 40%, 98%)',
        align: 'center'
      });
      
      slide1.addText('Your Complete Wellness Solution', {
        x: 1, y: 3.8, w: 10, h: 0.8,
        fontSize: 24, color: 'hsl(215, 20.2%, 65.1%)',
        align: 'center'
      });
      
      slide1.addText(appInfo.logo, {
        x: 4.5, y: 1, w: 3, h: 1,
        fontSize: 60, align: 'center'
      });

      // Slide 2: Problem Statement
      const slide2 = pres.addSlide();
      slide2.background = { fill: 'hsl(210, 40%, 98%)' };
      
      slide2.addText('The Problem', {
        x: 1, y: 0.5, w: 10, h: 1,
        fontSize: 36, bold: true, color: 'hsl(222.2, 84%, 4.9%)',
        align: 'center'
      });
      
      slide2.addText(appInfo.problemStatement, {
        x: 1, y: 2, w: 10, h: 3,
        fontSize: 18, color: 'hsl(222.2, 84%, 4.9%)',
        align: 'left', valign: 'top'
      });

      // Slide 3: Solution
      const slide3 = pres.addSlide();
      slide3.background = { fill: 'hsl(210, 40%, 98%)' };
      
      slide3.addText('Our Solution', {
        x: 1, y: 0.5, w: 10, h: 1,
        fontSize: 36, bold: true, color: 'hsl(222.2, 84%, 4.9%)',
        align: 'center'
      });
      
      slide3.addText(appInfo.solution, {
        x: 1, y: 2, w: 10, h: 3,
        fontSize: 18, color: 'hsl(222.2, 84%, 4.9%)',
        align: 'left', valign: 'top'
      });

      // Slide 4: Key Features
      const slide4 = pres.addSlide();
      slide4.background = { fill: 'hsl(210, 40%, 98%)' };
      
      slide4.addText('Key Features', {
        x: 1, y: 0.5, w: 10, h: 1,
        fontSize: 36, bold: true, color: 'hsl(222.2, 84%, 4.9%)',
        align: 'center'
      });
      
      const featuresText = appInfo.features.join('\n\n');
      slide4.addText(featuresText, {
        x: 1, y: 1.8, w: 10, h: 4,
        fontSize: 16, color: 'hsl(222.2, 84%, 4.9%)',
        align: 'left', valign: 'top'
      });

      // Slide 5: Target Audience
      const slide5 = pres.addSlide();
      slide5.background = { fill: 'hsl(210, 40%, 98%)' };
      
      slide5.addText('Target Audience', {
        x: 1, y: 0.5, w: 10, h: 1,
        fontSize: 36, bold: true, color: 'hsl(222.2, 84%, 4.9%)',
        align: 'center'
      });
      
      slide5.addText(appInfo.targetAudience, {
        x: 1, y: 2, w: 10, h: 3,
        fontSize: 18, color: 'hsl(222.2, 84%, 4.9%)',
        align: 'left', valign: 'top'
      });

      // Slide 6: How It Works
      const slide6 = pres.addSlide();
      slide6.background = { fill: 'hsl(210, 40%, 98%)' };
      
      slide6.addText('How It Works', {
        x: 1, y: 0.5, w: 10, h: 1,
        fontSize: 36, bold: true, color: 'hsl(222.2, 84%, 4.9%)',
        align: 'center'
      });
      
      const howItWorksText = appInfo.howItWorks.join('\n\n');
      slide6.addText(howItWorksText, {
        x: 1, y: 1.8, w: 10, h: 4,
        fontSize: 16, color: 'hsl(222.2, 84%, 4.9%)',
        align: 'left', valign: 'top'
      });

      // Slide 7: App Screenshots/Mockups
      const slide7 = pres.addSlide();
      slide7.background = { fill: 'hsl(210, 40%, 98%)' };
      
      slide7.addText('App Interface', {
        x: 1, y: 0.5, w: 10, h: 1,
        fontSize: 36, bold: true, color: 'hsl(222.2, 84%, 4.9%)',
        align: 'center'
      });
      
      slide7.addText('📱 Dashboard Overview\n\n🏋️ Workout Tracking\n\n💧 Wellness Monitoring\n\n📊 Progress Analytics', {
        x: 1, y: 2, w: 10, h: 3,
        fontSize: 18, color: 'hsl(222.2, 84%, 4.9%)',
        align: 'center', valign: 'middle'
      });

      // Slide 8: Thank You
      const slide8 = pres.addSlide();
      slide8.background = { fill: 'hsl(222.2, 84%, 4.9%)' };
      
      slide8.addText('Thank You', {
        x: 1, y: 2.5, w: 10, h: 1,
        fontSize: 42, bold: true, color: 'hsl(210, 40%, 98%)',
        align: 'center'
      });
      
      slide8.addText('Start your wellness journey today!', {
        x: 1, y: 3.8, w: 10, h: 0.8,
        fontSize: 20, color: 'hsl(215, 20.2%, 65.1%)',
        align: 'center'
      });

      // Generate and download the presentation
      await pres.writeFile({ fileName: `${appInfo.name}_Presentation.pptx` });
      
      toast.success('Presentation generated and downloaded successfully!');
    } catch (error) {
      console.error('Error generating presentation:', error);
      toast.error('Failed to generate presentation. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Presentation Generator
          </CardTitle>
          <CardDescription>
            Generate a professional presentation about your WellnessTracker app
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">App Information Collected:</h3>
            <div className="grid gap-4 text-sm">
              <div>
                <strong>App Name:</strong> {appInfo.name}
              </div>
              <div>
                <strong>Problem Statement:</strong> {appInfo.problemStatement}
              </div>
              <div>
                <strong>Key Features:</strong>
                <ul className="mt-2 space-y-1">
                  {appInfo.features.map((feature, index) => (
                    <li key={index} className="ml-4">• {feature}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Target Audience:</strong> {appInfo.targetAudience}
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold mb-3">Presentation Contents:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Title slide with app name and logo</li>
              <li>• Problem statement and market need</li>
              <li>• Solution overview and value proposition</li>
              <li>• Key features and functionality</li>
              <li>• Target audience analysis</li>
              <li>• How the app works (user flow)</li>
              <li>• App interface mockups</li>
              <li>• Closing slide</li>
            </ul>
          </div>

          <Button 
            onClick={generatePresentation}
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Presentation...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Generate & Download PPT
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PresentationGenerator;