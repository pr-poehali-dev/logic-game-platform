import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { getTasks, type Task } from '@/lib/mockData';

const Index = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>(getTasks());
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userProgress, setUserProgress] = useState(33);
  const [totalPoints, setTotalPoints] = useState(0);
  const { toast } = useToast();

  const categories = Array.from(new Set(tasks.map(t => t.category)));

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty = filterDifficulty === 'all' || task.difficulty === filterDifficulty;
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      toast({
        title: 'Выберите ответ',
        description: 'Пожалуйста, выберите один из вариантов',
        variant: 'destructive',
      });
      return;
    }

    const isCorrect = selectedAnswer === selectedTask?.correctAnswer;
    setShowResult(true);

    if (isCorrect && selectedTask) {
      setTasks(prev => prev.map(t => t.id === selectedTask.id ? { ...t, solved: true } : t));
      setTotalPoints(prev => prev + selectedTask.points);
      const newProgress = Math.min(100, userProgress + 10);
      setUserProgress(newProgress);
      
      toast({
        title: '🎉 Правильно!',
        description: `+${selectedTask.points} ⭐ | Отличная работа!`,
      });
    } else {
      toast({
        title: '❌ Неверно',
        description: 'Попробуйте ещё раз или переходите к следующей задаче.',
        variant: 'destructive',
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-secondary text-secondary-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const solvedCount = tasks.filter(t => t.solved).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Brain" className="text-primary-foreground" size={24} />
              </div>
              <h1 className="text-2xl font-bold">BrainQuest</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-lg">
                  <Icon name="Star" className="text-accent" size={18} />
                  <span className="font-semibold text-sm">{totalPoints}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Trophy" className="text-secondary" size={18} />
                  <span className="font-semibold">{solvedCount}/{tasks.length}</span>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => navigate('/profile')}>
                <Icon name="User" size={16} className="mr-2" />
                Профиль
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4 animate-fade-in">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold">Развивайте логическое мышление</h2>
            <p className="text-muted-foreground text-lg">Решайте задачи, отслеживайте прогресс, совершенствуйтесь каждый день</p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Ваш прогресс</span>
                  <span className="text-muted-foreground">{userProgress}%</span>
                </div>
                <Progress value={userProgress} className="h-3" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Поиск задач по названию, описанию или тегам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Сложность" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все уровни</SelectItem>
                <SelectItem value="easy">Легко</SelectItem>
                <SelectItem value="medium">Средне</SelectItem>
                <SelectItem value="hard">Сложно</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task, index) => (
            <Card
              key={task.id}
              className="hover:shadow-lg transition-all cursor-pointer group hover:scale-[1.02] animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleTaskClick(task)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(task.difficulty)}>
                      {task.difficulty === 'easy' && 'Легко'}
                      {task.difficulty === 'medium' && 'Средне'}
                      {task.difficulty === 'hard' && 'Сложно'}
                    </Badge>
                    <div className="flex items-center gap-1 text-accent font-semibold text-sm">
                      <Icon name="Star" size={14} />
                      <span>{task.points}</span>
                    </div>
                  </div>
                  {task.solved && (
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                      <Icon name="Check" size={16} className="text-secondary-foreground" />
                    </div>
                  )}
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">{task.title}</CardTitle>
                <CardDescription>{task.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="FolderOpen" size={16} />
                    <span>{task.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Задачи не найдены</h3>
            <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </main>

      <Dialog open={selectedTask !== null} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge className={getDifficultyColor(selectedTask?.difficulty || 'easy')}>
                {selectedTask?.difficulty === 'easy' && 'Легко'}
                {selectedTask?.difficulty === 'medium' && 'Средне'}
                {selectedTask?.difficulty === 'hard' && 'Сложно'}
              </Badge>
              <span className="text-sm text-muted-foreground">{selectedTask?.category}</span>
            </div>
            <DialogTitle className="text-2xl">{selectedTask?.title}</DialogTitle>
            <DialogDescription>{selectedTask?.description}</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="bg-muted/50 p-6 rounded-lg">
              <h4 className="font-semibold mb-3 text-lg">{selectedTask?.question}</h4>
            </div>

            <div className="space-y-3">
              {selectedTask?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedAnswer === index
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  } ${
                    showResult && index === selectedTask?.correctAnswer
                      ? 'border-secondary bg-secondary/10'
                      : ''
                  } ${
                    showResult && selectedAnswer === index && index !== selectedTask?.correctAnswer
                      ? 'border-destructive bg-destructive/10'
                      : ''
                  } disabled:cursor-not-allowed`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index ? 'border-primary bg-primary' : 'border-muted-foreground'
                    }`}>
                      {selectedAnswer === index && (
                        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                    {showResult && index === selectedTask?.correctAnswer && (
                      <Icon name="CheckCircle2" className="ml-auto text-secondary" size={20} />
                    )}
                    {showResult && selectedAnswer === index && index !== selectedTask?.correctAnswer && (
                      <Icon name="XCircle" className="ml-auto text-destructive" size={20} />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {!showResult ? (
              <Button onClick={handleSubmitAnswer} className="w-full" size="lg">
                Проверить ответ
              </Button>
            ) : (
              <Button onClick={() => setSelectedTask(null)} className="w-full" size="lg" variant="outline">
                Закрыть
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;