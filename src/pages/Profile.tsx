import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { getTasks, getMedals, type Task } from '@/lib/mockData';

const Profile = () => {
  const navigate = useNavigate();
  const tasks = getTasks();
  const medals = getMedals();
  const earnedMedals = medals.filter(m => m.earnedDate);
  
  const [user] = useState({
    name: 'Алексей Иванов',
    email: 'alexey.ivanov@example.com',
    username: 'alexey_dev',
    registeredDate: '15 января 2025',
    level: 5,
  });

  const solvedTasks = tasks.filter(task => task.solved);
  const totalStars = solvedTasks.reduce((sum, task) => sum + task.points, 0);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const stats = [
    { label: 'Звёзды', value: totalStars, icon: 'Star' },
    { label: 'Решено задач', value: solvedTasks.length, icon: 'CheckCircle2' },
    { label: 'Уровень', value: user.level, icon: 'Trophy' },
    { label: 'Всего задач', value: tasks.length, icon: 'ListTodo' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/tasks')}
              className="gap-2"
            >
              <Icon name="ArrowLeft" size={20} />
              Назад к задачам
            </Button>
            <div className="flex items-center gap-2">
              <Icon name="Star" size={20} className="text-accent" />
              <span className="font-bold text-lg">{totalStars}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                  <div className="space-y-1 text-muted-foreground">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Icon name="Mail" size={16} />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Icon name="User" size={16} />
                      <span>@{user.username}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Icon name="Calendar" size={16} />
                      <span>Регистрация: {user.registeredDate}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-4 rounded-lg bg-secondary/50">
                      <Icon name={stat.icon as any} size={24} className="mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {earnedMedals.length > 0 && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Icon name="Award" size={18} />
                        Медали и достижения
                      </h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate('/achievements')}
                      >
                        Все достижения
                        <Icon name="ChevronRight" size={16} className="ml-1" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                      {earnedMedals.map((medal) => (
                        <div 
                          key={medal.id}
                          className="flex-shrink-0 p-3 rounded-lg bg-accent/10 border border-accent/20 hover:bg-accent/20 transition-colors cursor-pointer"
                          onClick={() => navigate('/achievements')}
                        >
                          <div className="text-3xl mb-1 text-center">{medal.icon}</div>
                          <div className="text-xs text-center font-medium whitespace-nowrap">
                            {medal.name.length > 15 ? medal.name.substring(0, 15) + '...' : medal.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="History" size={24} />
              История решённых задач
            </CardTitle>
          </CardHeader>
          <CardContent>
            {solvedTasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="Inbox" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Пока нет решённых задач</p>
              </div>
            ) : (
              <div className="space-y-3">
                {solvedTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/5 transition-colors cursor-pointer"
                    onClick={() => navigate('/tasks')}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Check" size={20} className="text-success" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 truncate">{task.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{task.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Badge className={getDifficultyColor(task.difficulty)}>
                        {task.difficulty === 'easy' && 'Легко'}
                        {task.difficulty === 'medium' && 'Средне'}
                        {task.difficulty === 'hard' && 'Сложно'}
                      </Badge>
                      <div className="flex items-center gap-1 text-accent font-bold">
                        <Icon name="Star" size={16} />
                        <span>+{task.points}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;