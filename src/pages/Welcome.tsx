import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'Brain',
      title: 'Развивайте логику',
      description: 'Сотни задач от простых до экспертных',
    },
    {
      icon: 'Trophy',
      title: 'Зарабатывайте звёзды',
      description: 'Получайте баллы и поднимайтесь в рейтинге',
    },
    {
      icon: 'Target',
      title: 'Марафоны задач',
      description: 'Челленджи и ежедневные испытания',
    },
  ];

  const stats = [
    { value: '500+', label: 'Задач' },
    { value: '10K+', label: 'Пользователей' },
    { value: '50K+', label: 'Решений' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Icon name="Brain" className="text-primary-foreground" size={24} />
          </div>
          <h1 className="text-2xl font-bold">BrainQuest</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Прокачивайте мозг
              <br />
              <span className="text-primary">каждый день</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Решайте логические задачи, зарабатывайте звёзды, соревнуйтесь с друзьями и становитесь мастером логики
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="text-lg h-14 px-8"
              onClick={() => navigate('/tasks')}
            >
              <Icon name="Rocket" size={20} className="mr-2" />
              Начать обучение
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg h-14 px-8"
              onClick={() => navigate('/tasks')}
            >
              <Icon name="LogIn" size={20} className="mr-2" />
              Уже есть аккаунт
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 md:gap-12 pt-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm md:text-base text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-20 md:mt-32">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-3">Почему BrainQuest?</h3>
            <p className="text-muted-foreground text-lg">Всё для эффективного развития логического мышления</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-primary transition-all hover:shadow-lg animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Icon name={feature.icon as any} className="text-primary" size={32} />
                  </div>
                  <h4 className="text-xl font-semibold">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-20 md:mt-32 text-center">
          <Card className="bg-gradient-to-br from-primary to-primary/80 border-0 text-primary-foreground">
            <CardContent className="py-12 px-6 space-y-6">
              <div className="w-20 h-20 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Zap" className="text-primary-foreground" size={40} />
              </div>
              <h3 className="text-3xl font-bold">Готовы начать?</h3>
              <p className="text-primary-foreground/90 text-lg max-w-xl mx-auto">
                Присоединяйтесь к тысячам пользователей, которые уже развивают свой интеллект вместе с нами
              </p>
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg h-14 px-8"
                onClick={() => navigate('/tasks')}
              >
                Начать бесплатно
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-20 border-t">
        <div className="text-center text-muted-foreground text-sm">
          © 2025 BrainQuest. Развивайте логику с удовольствием
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
