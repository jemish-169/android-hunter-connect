
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Search, MessageSquare, Clipboard, Zap, SettingsIcon, List, Target } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">LinkedIn Android Hunter</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Smart Chrome extension to find Android development opportunities on LinkedIn
          </p>
        </div>

        <Card className="mb-12 border-blue-200 shadow-md bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-700">How It Works</CardTitle>
            <CardDescription>
              LinkedIn Android Hunter scans your LinkedIn feed to identify posts about Android development opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-lg mb-2">Smart Detection</h3>
                <p className="text-gray-600">Identifies posts mentioning Android development and hiring terms</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-lg mb-2">Visual Highlighting</h3>
                <p className="text-gray-600">Highlights relevant posts with customizable colors</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-lg mb-2">Quick Contact</h3>
                <p className="text-gray-600">Extracts email addresses and provides one-click contact options</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="install" className="mb-12">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="install">Installation</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="customize">Customization</TabsTrigger>
          </TabsList>
          <TabsContent value="install" className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">How to Install</h2>
            <ol className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">1</span>
                <span>Download the extension files from the <code className="bg-gray-100 px-2 py-1 rounded">public/extension</code> folder</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">2</span>
                <span>Open Chrome and navigate to <code className="bg-gray-100 px-2 py-1 rounded">chrome://extensions</code></span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">3</span>
                <span>Enable <b>"Developer mode"</b> in the top-right corner</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">4</span>
                <span>Click <b>"Load unpacked"</b> and select the extension folder</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">5</span>
                <span>Pin the extension to your toolbar for easy access</span>
              </li>
            </ol>
          </TabsContent>
          <TabsContent value="usage" className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">How to Use</h2>
            <div className="space-y-5">
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Browse LinkedIn</h3>
                  <p className="text-gray-600">Simply browse your LinkedIn feed as usual. The extension automatically highlights posts about Android development opportunities.</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">See Contact Options</h3>
                  <p className="text-gray-600">When an email is detected, you'll see a floating panel with quick contact options at the bottom of the post.</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <Clipboard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Quick Actions</h3>
                  <p className="text-gray-600">Use the one-click email button or copy the pre-written template to your clipboard for easy application.</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="customize" className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Customization Options</h2>
            <div className="space-y-5">
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <List className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Keywords</h3>
                  <p className="text-gray-600">Customize the Android-related and hiring keywords the extension looks for in LinkedIn posts.</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email Template</h3>
                  <p className="text-gray-600">Edit the email template to match your personal style and include relevant details about your experience.</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <SettingsIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Appearance</h3>
                  <p className="text-gray-600">Choose the highlight color that works best for you to identify relevant posts at a glance.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="border-blue-200 shadow-md bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-700">Download Extension</CardTitle>
            <CardDescription>
              Get started with LinkedIn Android Hunter today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              The extension is designed to be lightweight and privacy-focused. It only runs on LinkedIn and does not collect any personal data.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <a href="/extension/manifest.json" className="flex items-center" download>
                <Zap className="mr-2 h-4 w-4" />
                Download Extension Files
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
