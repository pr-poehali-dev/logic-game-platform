import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { getMarathonData, type MarathonDay } from '@/lib/mockData';

const Marathon = () => {
  const navigate = useNavigate();
  const [marathonDays, setMarathonDays] = useState<MarathonDay[]>(getMarathonData());
  
  const completedDays = marathonDays.filter(d => d.completed).length;
  const currentDay = completedDays + 1;
  const totalDays = 30;
  const progressPercent = (completedDays / totalDays) * 100;
  const streak = completedDays;
  const allowedSkips = 1;
  const usedSkips = marathonDays.filter(d => d.skipped).length;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-secondary text-secondary-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleStartTask = (day: MarathonDay) => {
    console.log('Starting task for day:', day.day);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>
            <h1 className="text-2xl font-bold">30-дневный марафон</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Card className="mb-8 bg-gradient-to-br from-primary via-primary/90 to-accent border-0 shadow-2xl">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="Flame" className="text-primary-foreground" size={32} />
                    <h2 className="text-3xl font-bold text-primary-foreground">День {currentDay} из {totalDays}</h2>
                  </div>
                  <p className="text-primary-foreground/90 text-lg">
                    Решайте по одной задаче каждый день. Пропустите день — серия обнулится!
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary-foreground">{streak}</div>
                  <div className="text-primary-foreground/80 text-sm">дней подряд</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-primary-foreground/90">
                  <span className="font-medium">Прогресс марафона</span>
                  <span>{completedDays}/{totalDays} дней</span>
                </div>
                <Progress value={progressPercent} className="h-4 bg-primary-foreground/20" />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-primary-foreground/20">
                <div className="flex items-center gap-2 text-primary-foreground">
                  <Icon name="Heart" size={20} />
                  <span className="text-sm">Пропуски: {usedSkips}/{allowedSkips}</span>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/achievements')}
                  className="text-primary-foreground hover:bg-background/10"
                >
                  <Icon name="Award" size={18} className="mr-2" />
                  Награды
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {completedDays >= totalDays && (
          <Card className="mb-8 bg-gradient-to-br from-accent via-secondary to-primary border-0 shadow-2xl animate-bounce-slow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-6">
                <div className="text-8xl">🏆</div>
                <div>
                  <h3 className="text-3xl font-bold text-primary-foreground mb-2">Поздравляем!</h3>
                  <p className="text-primary-foreground/90 text-lg mb-4">
                    Вы завершили 30-дневный марафон! Получите золотую медаль и 500 звёзд!
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-background text-primary hover:bg-background/90"
                    onClick={() => navigate('/achievements')}
                  >
                    <Icon name="Award" size={20} className="mr-2" />
                    Забрать награду
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Задачи марафона</h3>
            <Badge variant="secondary" className="text-sm">
              Сложность увеличивается
            </Badge>
          </div>

          <div className="grid gap-4">
            {marathonDays.map((day) => {
              const isLocked = day.day > currentDay;
              const isCurrent = day.day === currentDay;

              return (
                <Card 
                  key={day.day}
                  className={`relative overflow-hidden transition-all hover:shadow-lg ${
                    isCurrent ? 'ring-2 ring-primary shadow-xl' : ''
                  } ${isLocked ? 'opacity-50' : ''}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold ${
                          day.completed ? 'bg-secondary text-secondary-foreground' : 
                          isCurrent ? 'bg-primary text-primary-foreground' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {day.completed ? <Icon name="Check" size={28} /> : day.day}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-xl">{day.task.title}</CardTitle>
                            {isCurrent && <Badge variant="default">Сегодня</Badge>}
                          </div>
                          <CardDescription>{day.task.description}</CardDescription>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getDifficultyColor(day.task.difficulty)}>
                              {day.task.difficulty === 'easy' ? 'Легко' : 
                               day.task.difficulty === 'medium' ? 'Средне' : 'Сложно'}
                            </Badge>
                            <Badge variant="outline">{day.task.category}</Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Icon name="Star" size={14} className="text-accent" />
                              <span>+{day.task.points}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {day.completed && (
                        <div className="text-right">
                          <Badge variant="secondary" className="mb-2">
                            <Icon name="CheckCircle2" size={14} className="mr-1" />
                            Завершено
                          </Badge>
                          <p className="text-xs text-muted-foreground">{day.date}</p>
                        </div>
                      )}
                      {isLocked && (
                        <Icon name="Lock" size={24} className="text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                  {!day.completed && !isLocked && (
                    <CardContent>
                      <Button 
                        onClick={() => handleStartTask(day)}
                        className="w-full"
                        size="lg"
                        variant={isCurrent ? 'default' : 'outline'}
                      >
                        <Icon name="Play" size={18} className="mr-2" />
                        {isCurrent ? 'Решить сейчас' : 'Начать задачу'}
                      </Button>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="mt-8 bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Info" size={20} />
              Правила марафона
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Каждый день открывается новая задача</p>
            <p>• Пропустите день — серия обнуляется, придётся начинать заново</p>
            <p>• У вас есть 1 "джокер" — можно пропустить один день без потери прогресса</p>
            <p>• За завершение марафона: 🥇 Золотая медаль + 500 ⭐ звёзд</p>
            <p>• За завершение с джокером: 🥈 Серебряная медаль + 350 ⭐ звёзд</p>
            <p>• Каждая последующая задача сложнее предыдущей</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Marathon;
