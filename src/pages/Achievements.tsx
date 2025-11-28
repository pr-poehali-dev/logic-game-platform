import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { getMedals, type Medal } from '@/lib/mockData';

const Achievements = () => {
  const navigate = useNavigate();
  const [medals] = useState<Medal[]>(getMedals());

  const earnedMedals = medals.filter(m => m.earnedDate);
  const lockedMedals = medals.filter(m => !m.earnedDate);
  const totalStars = earnedMedals.length * 100;

  const stats = [
    { label: 'Всего медалей', value: earnedMedals.length, total: medals.length, icon: 'Award' },
    { label: 'Заработано звёзд', value: totalStars, icon: 'Star' },
    { label: 'Серия дней', value: 7, icon: 'Flame' },
    { label: 'Завершено марафонов', value: 1, icon: 'Trophy' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>
            <h1 className="text-2xl font-bold">Достижения</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Card className="mb-8 bg-gradient-to-br from-primary via-primary/90 to-accent border-0 shadow-2xl">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-primary-foreground mb-2">Ваши достижения</h2>
                <p className="text-primary-foreground/80 text-lg">
                  Отслеживайте свой прогресс и получайте награды за упорство
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div 
                    key={stat.label}
                    className="bg-background/10 backdrop-blur rounded-xl p-4 border border-primary-foreground/20 text-center"
                  >
                    <Icon 
                      name={stat.icon as any} 
                      className="text-primary-foreground mx-auto mb-2" 
                      size={32} 
                    />
                    <div className="text-3xl font-bold text-primary-foreground mb-1">
                      {stat.total ? `${stat.value}/${stat.total}` : stat.value}
                    </div>
                    <div className="text-primary-foreground/80 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="earned" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="earned" className="flex items-center gap-2">
              <Icon name="Award" size={16} />
              Полученные ({earnedMedals.length})
            </TabsTrigger>
            <TabsTrigger value="locked" className="flex items-center gap-2">
              <Icon name="Lock" size={16} />
              Заблокированные ({lockedMedals.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="earned" className="space-y-4">
            {earnedMedals.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Icon name="Award" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Пока нет медалей</h3>
                  <p className="text-muted-foreground mb-4">
                    Начните решать задачи и участвовать в марафонах, чтобы получить первую медаль!
                  </p>
                  <Button onClick={() => navigate('/marathon')}>
                    <Icon name="Trophy" size={16} className="mr-2" />
                    Начать марафон
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {earnedMedals.map((medal) => (
                  <Card 
                    key={medal.id}
                    className="relative overflow-hidden bg-gradient-to-br from-accent/10 to-secondary/10 border-accent/20 hover:shadow-xl transition-all"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16" />
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="text-6xl">{medal.icon}</div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{medal.name}</CardTitle>
                          <CardDescription className="text-base">
                            {medal.description}
                          </CardDescription>
                          <div className="flex items-center gap-2 mt-3">
                            <Badge variant="secondary">
                              <Icon name="Calendar" size={12} className="mr-1" />
                              {new Date(medal.earnedDate!).toLocaleDateString('ru-RU')}
                            </Badge>
                            {medal.marathonNumber && (
                              <Badge variant="outline">
                                Марафон #{medal.marathonNumber}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="locked" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {lockedMedals.map((medal) => (
                <Card 
                  key={medal.id}
                  className="relative overflow-hidden opacity-60 hover:opacity-80 transition-opacity"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/10" />
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="text-6xl grayscale">{medal.icon}</div>
                        <Icon 
                          name="Lock" 
                          size={24} 
                          className="absolute bottom-0 right-0 text-muted-foreground bg-background rounded-full p-1" 
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 text-muted-foreground">
                          {medal.name}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {medal.description}
                        </CardDescription>
                        <Badge variant="outline" className="mt-3">
                          <Icon name="Target" size={12} className="mr-1" />
                          Не получено
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Lightbulb" size={20} />
              Как получить медали
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Icon name="Trophy" size={16} className="text-accent" />
                  Марафоны
                </h4>
                <p className="text-sm text-muted-foreground">
                  Завершите 30-дневный марафон без пропусков, чтобы получить золотую медаль и 500 звёзд
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Icon name="Flame" size={16} className="text-accent" />
                  Серии
                </h4>
                <p className="text-sm text-muted-foreground">
                  Решайте задачи каждый день подряд, чтобы получить медали за 7, 14 и 30-дневные серии
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Icon name="Star" size={16} className="text-accent" />
                  Перфекционизм
                </h4>
                <p className="text-sm text-muted-foreground">
                  Решайте задачи с первой попытки, чтобы получить специальные медали
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Icon name="Zap" size={16} className="text-accent" />
                  Скорость
                </h4>
                <p className="text-sm text-muted-foreground">
                  Решайте задачи быстрее минуты, чтобы получить медаль "Молния"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button size="lg" onClick={() => navigate('/marathon')}>
            <Icon name="Rocket" size={20} className="mr-2" />
            Начать зарабатывать медали
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Achievements;
