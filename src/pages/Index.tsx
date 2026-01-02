import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const serviceCategories = [
  {
    category: 'Уходы за лицом',
    icon: 'Sparkles',
    services: [
      { title: 'Массаж ручной с дополнительным использованием гаджетов на препаратах итальянского бренда VAGHEGGI', price: 3500 },
      { title: 'Идеальная матовость: уход за жирной кожей на препаратах линии ACNON - GIGI', price: 3500 },
      { title: 'Внутреннее сияние: фруктовый уход для обновления и омоложения кожи на препаратах линии ESTER C - GIGI', price: 3500 },
      { title: 'Упругость и питание, защита микробиома: уход для мужчин на препаратах линии ATYPICAL - VAGHEGGI', price: 3500 },
      { title: 'Волшебное преображение: ANTI-AGE уход за уставшей тусклой кожей на препаратах линии INTENSE - VAGHEGGI', price: 3500 },
      { title: 'Сияние и лоск, анти-пигмент, PREVENT AGE на препаратах линии WHITE MOON - VAGHEGGI', price: 3500 },
      { title: 'Глубокое увлажнение и питание кожи на препаратах линии REHYDRA - VAGHEGGI', price: 3500 },
      { title: 'Комбинированная чистка лица на препаратах израильского бренда косметики GIGI', price: 4000 }
    ]
  },
  {
    category: 'Уход за руками',
    icon: 'Hand',
    services: [
      { title: 'Руки принцессы: уход за нежной кожей рук', price: 800 }
    ]
  },
  {
    category: 'Макияж',
    icon: 'Palette',
    services: [
      { title: 'Дневной макияж', price: 2500 },
      { title: 'Express - макияж', price: 2000 }
    ]
  },
  {
    category: 'Наращивание ресниц',
    icon: 'Eye',
    services: [
      { title: 'Голливудский объём', price: 4000 },
      { title: 'Тройной объём', price: 3500 },
      { title: 'Двойной объём', price: 3100 },
      { title: 'Полуторный объём', price: 2900 },
      { title: 'Классическое наращивание ресниц', price: 2700 },
      { title: 'Уголки / Неполное наращивание', price: 2000 },
      { title: 'Пробное наращивание (неполное, впервые)', price: 1800 },
      { title: 'Снятие', price: 500 },
      { title: 'Коррекция', price: 1 }
    ]
  },
  {
    category: 'Дополнительные эффекты для ресниц',
    icon: 'Sparkle',
    services: [
      { title: 'Эффект стрелочки (+ к стоимости услуги)', price: 400 },
      { title: 'Вставки цветных ресниц (+ к стоимости услуги)', price: 400 },
      { title: 'Эффект мокрых ресниц (+ к стоимости услуги)', price: 400 },
      { title: 'Эффект Лучики (+ к стоимости услуги)', price: 400 }
    ]
  },
  {
    category: 'Ламинирование ресниц и бровей',
    icon: 'Gem',
    services: [
      { title: 'Комплекс Ламинирование ресниц + бровей', price: 4700 },
      { title: 'Ламинирование ресниц', price: 2700 },
      { title: 'Окрашивание ресниц', price: 800 }
    ]
  },
  {
    category: 'Оформление бровей',
    icon: 'Scissors',
    services: [
      { title: 'Долговременная укладка + Архитектура бровей', price: 2700 },
      { title: 'Долговременная укладка с окрашиванием', price: 2400 },
      { title: 'Долговременная укладка бровей', price: 1800 },
      { title: 'Архитектура бровей (коррекция + окр. краска)', price: 1400 },
      { title: 'Мужская коррекция бровей', price: 1000 },
      { title: 'Окрашивание краской', price: 800 },
      { title: 'Коррекция бровей (воск + пинцет)', price: 800 },
      { title: 'Коррекция бровей (пинцет)', price: 600 }
    ]
  },
  {
    category: 'Депиляция',
    icon: 'Flame',
    services: [
      { title: 'Удаление нежелательных волос на лице 1 зона (воск)', price: 400 }
    ]
  }
];

const services = serviceCategories.flatMap(cat => 
  cat.services.slice(0, 2).map((service, idx) => ({
    id: `${cat.category}-${idx}`,
    title: service.title,
    description: cat.category,
    price: `${service.price.toLocaleString('ru-RU')} ₽`,
    icon: cat.icon
  }))
);

const testimonials = [
  {
    id: 1,
    name: 'Анна Петрова',
    text: 'Нарастила ресницы в Portret - теперь хожу только сюда! Голливудский объём смотрится естественно и роскошно. Мастер - золотые руки!',
    rating: 5,
    service: 'Наращивание ресниц'
  },
  {
    id: 2,
    name: 'Елена Соколова',
    text: 'Делаю чистку лица только в Portret. Всегда чисто, аккуратно, без боли. Результат виден сразу!',
    rating: 5,
    service: 'Чистка лица'
  },
  {
    id: 3,
    name: 'Мария Иванова',
    text: 'Массаж лица с гаджетами на препаратах VAGHEGGI - это волшебство! Кожа подтянулась, овал лица четче, сияние изнутри. Рекомендую всем!',
    rating: 5,
    service: 'Массаж лица'
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('hero');
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка отправлена!',
      description: 'Мы свяжемся с вами в ближайшее время для подтверждения записи.',
    });
    setFormData({ name: '', phone: '', service: '', date: '', message: '' });
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center">
              <Icon name="Sparkles" size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">PORTRET</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('hero')} className="text-sm hover:text-primary transition-colors">
              Главная
            </button>
            <button onClick={() => scrollToSection('services')} className="text-sm hover:text-primary transition-colors">
              Услуги
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-sm hover:text-primary transition-colors">
              Отзывы
            </button>
            <button onClick={() => scrollToSection('booking')} className="text-sm hover:text-primary transition-colors">
              Запись
            </button>
            <button onClick={() => scrollToSection('contacts')} className="text-sm hover:text-primary transition-colors">
              Контакты
            </button>
          </div>
          <Button 
            onClick={() => scrollToSection('booking')}
            className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity"
          >
            Записаться
          </Button>
        </div>
      </nav>

      <section id="hero" className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl opacity-30"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Студия эстетики лица{' '}
                <span className="gradient-text">PORTRET</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Профессиональные косметологические процедуры для вашей красоты и уверенности
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('booking')}
                  className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity"
                >
                  Записаться на процедуру
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => scrollToSection('services')}
                  className="border-primary/50 hover:bg-primary/10"
                >
                  Наши услуги
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">5+</div>
                  <div className="text-sm text-muted-foreground mt-1">лет опыта</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">2000+</div>
                  <div className="text-sm text-muted-foreground mt-1">клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">15+</div>
                  <div className="text-sm text-muted-foreground mt-1">услуг</div>
                </div>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-2xl opacity-30"></div>
              <img 
                src="https://cdn.poehali.dev/files/freepik__-__21214.jpeg"
                alt="Студия эстетики PORTRET"
                className="rounded-3xl relative z-10 w-full h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-primary/20 bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4">
                  <Icon name="Award" size={24} className="text-white" />
                </div>
                <CardTitle>Профессиональные специалисты</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Наши мастера регулярно повышают квалификацию и следят за новыми трендами в индустрии красоты
                </p>
              </CardContent>
            </Card>
            <Card className="border-secondary/20 bg-card/50 backdrop-blur hover:border-secondary/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center mb-4">
                  <Icon name="Shield" size={24} className="text-white" />
                </div>
                <CardTitle>Премиум препараты</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Используем только сертифицированные препараты от мировых производителей
                </p>
              </CardContent>
            </Card>
            <Card className="border-accent/20 bg-card/50 backdrop-blur hover:border-accent/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center mb-4">
                  <Icon name="Heart" size={24} className="text-white" />
                </div>
                <CardTitle>Индивидуальный подход</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Разрабатываем персональную программу ухода для каждого клиента
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Прайс-лист услуг</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Полный спектр косметологических процедур и услуг красоты
            </p>
          </div>
          <div className="space-y-8">
            {serviceCategories.map((category, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
                    <Icon name={category.icon as any} size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold gradient-text">{category.category}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.services.map((service, serviceIdx) => (
                    <Card 
                      key={serviceIdx}
                      className="border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-1">{service.title}</h4>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-primary whitespace-nowrap">
                              {service.price.toLocaleString('ru-RU')} ₽
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-4 bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Отзывы клиентов</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Что говорят о нас наши клиенты
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-border bg-card/50 backdrop-blur">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription className="text-sm mt-1">{testimonial.service}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-accent fill-accent" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 blur-3xl"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold gradient-text">Записаться на процедуру</h2>
              <p className="text-xl text-muted-foreground">
                Оставьте заявку, и мы свяжемся с вами для подтверждения записи и уточнения деталей
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="Clock" size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Режим работы</div>
                    <div className="text-sm text-muted-foreground">Пн-Вс: 10:00 - 20:00</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Icon name="Phone" size={20} className="text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold">Телефон</div>
                    <div className="text-sm text-muted-foreground">+7 (914) 693-43-43</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Icon name="MapPin" size={20} className="text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold">Адрес</div>
                    <div className="text-sm text-muted-foreground">г. Владивосток, ул. Уборевича, д. 19</div>
                  </div>
                </div>
              </div>
            </div>
            <Card className="border-primary/20 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl">Форма записи</CardTitle>
                <CardDescription>Заполните форму и мы свяжемся с вами</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input 
                      id="name" 
                      placeholder="Анна Петрова"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Интересующая услуга</Label>
                    <Select 
                      value={formData.service}
                      onValueChange={(value) => setFormData({...formData, service: value})}
                      required
                    >
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceCategories.map((category) => 
                          category.services.map((service, idx) => (
                            <SelectItem key={`${category.category}-${idx}`} value={service.title}>
                              {service.title}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Желаемая дата</Label>
                    <Input 
                      id="date" 
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Комментарий (необязательно)</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Укажите удобное время или дополнительные пожелания"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity"
                    size="lg"
                  >
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Контакты</h2>
            <p className="text-xl text-muted-foreground">Мы находимся в самом центре Владивостока</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <Card className="border-border bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MapPin" className="text-primary" />
                    Адрес студии
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-lg">г. Владивосток, ул. Уборевича, д. 19</p>
                  <p className="text-sm text-muted-foreground">5 минут от центра города</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Phone" className="text-secondary" />
                    Телефон
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="tel:+79146934343" className="text-lg hover:text-primary transition-colors">
                    +7 (914) 693-43-43
                  </a>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Clock" className="text-accent" />
                    Режим работы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">Ежедневно: 10:00 - 20:00</p>
                  <p className="text-sm text-muted-foreground mt-2">Без выходных</p>
                </CardContent>
              </Card>
              <div className="flex gap-4 pt-4">
                <Button variant="outline" size="icon" className="rounded-full border-primary/50 hover:bg-primary/10">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-secondary/50 hover:bg-secondary/10">
                  <Icon name="MessageCircle" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-accent/50 hover:bg-accent/10">
                  <Icon name="Mail" size={20} />
                </Button>
              </div>
            </div>
            <div className="h-[500px] rounded-2xl overflow-hidden border border-border">
              <iframe 
                src="https://yandex.ru/map-widget/v1/?ll=131.913620,43.115141&z=16&l=map&pt=131.913620,43.115141,pm2rdm"
                width="100%" 
                height="100%" 
                frameBorder="0"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center">
                  <Icon name="Sparkles" size={20} className="text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">PORTRET</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Студия эстетики лица в центре Владивостока. Профессиональный уход и забота о вашей красоте.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Навигация</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('services')} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Услуги
                </button>
                <button onClick={() => scrollToSection('testimonials')} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Отзывы
                </button>
                <button onClick={() => scrollToSection('booking')} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Запись
                </button>
                <button onClick={() => scrollToSection('contacts')} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Контакты
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>г. Владивосток</p>
                <p>ул. Уборевича, д. 19</p>
                <p>+7 (914) 693-43-43</p>
                <p>Пн-Вс: 10:00 - 20:00</p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 PORTRET. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}