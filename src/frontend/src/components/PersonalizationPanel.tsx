import { useState } from 'react';
import { usePersonalization } from '../hooks/useLocalStorageState';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Plus, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function PersonalizationPanel() {
  const { personalization, updatePersonalization, resetToDefaults } = usePersonalization();
  const [isOpen, setIsOpen] = useState(false);

  const handleAddReason = () => {
    updatePersonalization({
      reasonsList: [...personalization.reasonsList, 'New reason...'],
    });
  };

  const handleUpdateReason = (index: number, value: string) => {
    const newReasons = [...personalization.reasonsList];
    newReasons[index] = value;
    updatePersonalization({ reasonsList: newReasons });
  };

  const handleRemoveReason = (index: number) => {
    const newReasons = personalization.reasonsList.filter((_, i) => i !== index);
    updatePersonalization({ reasonsList: newReasons });
  };

  const handleAddMemory = () => {
    updatePersonalization({
      memoryTimeline: [
        ...personalization.memoryTimeline,
        { title: 'New Memory', description: 'Description...', date: 'Date' },
      ],
    });
  };

  const handleUpdateMemory = (
    index: number,
    field: 'title' | 'description' | 'date',
    value: string
  ) => {
    const newMemories = [...personalization.memoryTimeline];
    newMemories[index] = { ...newMemories[index], [field]: value };
    updatePersonalization({ memoryTimeline: newMemories });
  };

  const handleRemoveMemory = (index: number) => {
    const newMemories = personalization.memoryTimeline.filter((_, i) => i !== index);
    updatePersonalization({ memoryTimeline: newMemories });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Personalize Your Message</SheetTitle>
          <SheetDescription>
            Customize all the content to make it perfect for your special someone.
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="basic" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="letter">Letter</TabsTrigger>
            <TabsTrigger value="reasons">Reasons</TabsTrigger>
            <TabsTrigger value="memories">Memories</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100vh-250px)] mt-4">
            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={personalization.girlfriendName}
                  onChange={(e) => updatePersonalization({ girlfriendName: e.target.value })}
                  placeholder="Enter name..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Textarea
                  id="subtitle"
                  value={personalization.subtitle}
                  onChange={(e) => updatePersonalization({ subtitle: e.target.value })}
                  placeholder="Enter subtitle..."
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 pt-4">
                <div className="space-y-0.5">
                  <Label>Background Effects</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable floating hearts and sparkles
                  </p>
                </div>
                <Switch
                  checked={personalization.enableBackgroundEffects}
                  onCheckedChange={(checked) =>
                    updatePersonalization({ enableBackgroundEffects: checked })
                  }
                />
              </div>

              <Button onClick={resetToDefaults} variant="outline" className="w-full mt-4">
                Reset to Defaults
              </Button>
            </TabsContent>

            <TabsContent value="letter" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="letter">Love Letter</Label>
                <Textarea
                  id="letter"
                  value={personalization.loveLetterText}
                  onChange={(e) => updatePersonalization({ loveLetterText: e.target.value })}
                  placeholder="Write your love letter..."
                  rows={15}
                  className="font-serif"
                />
              </div>
            </TabsContent>

            <TabsContent value="reasons" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <Label>Reasons I Love You</Label>
                <Button onClick={handleAddReason} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>

              <div className="space-y-3">
                {personalization.reasonsList.map((reason, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={reason}
                      onChange={(e) => handleUpdateReason(index, e.target.value)}
                      placeholder={`Reason ${index + 1}...`}
                    />
                    <Button
                      onClick={() => handleRemoveReason(index)}
                      size="icon"
                      variant="ghost"
                      className="shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="memories" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <Label>Memory Timeline</Label>
                <Button onClick={handleAddMemory} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>

              <div className="space-y-6">
                {personalization.memoryTimeline.map((memory, index) => (
                  <div key={index} className="space-y-2 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <Label>Memory {index + 1}</Label>
                      <Button
                        onClick={() => handleRemoveMemory(index)}
                        size="icon"
                        variant="ghost"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Input
                      value={memory.title}
                      onChange={(e) => handleUpdateMemory(index, 'title', e.target.value)}
                      placeholder="Title..."
                    />
                    <Textarea
                      value={memory.description}
                      onChange={(e) => handleUpdateMemory(index, 'description', e.target.value)}
                      placeholder="Description..."
                      rows={3}
                    />
                    <Input
                      value={memory.date}
                      onChange={(e) => handleUpdateMemory(index, 'date', e.target.value)}
                      placeholder="Date..."
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
