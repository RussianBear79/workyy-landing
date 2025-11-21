import { useState } from 'react'

const plans = [
  {
    name: 'Teams',
    price: '$49',
    description: 'Для аналитических команд до 15 человек.',
    features: ['Неограниченные канвы', 'SQL + Python клетки', 'Библиотека интеграций', 'Поддержка в Slack'],
  },
  {
    name: 'Startups',
    price: '$99',
    description: 'Команды роста и продуктовые организации.',
    features: ['До 40 пользователей', 'AI-генерация презентаций', 'Коннекторы Workflows', 'Приоритетная поддержка'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Безлимитные воркспейсы, безопасность и кастомные интеграции.',
    features: ['SSO + SCIM', 'Выделенный CSM', 'Гибкое развертывание', 'Настраиваемые SLA'],
  },
]

const PricingPage = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="bg-[#010513] text-white min-h-screen">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),transparent_55%),radial-gradient(circle_at_bottom,_rgba(124,58,237,0.2),transparent_45%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="uppercase tracking-[0.4em] text-brand-green text-xs mb-4">Pricing</p>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Workyy — прозрачные тарифы</h1>
          <p className="text-gray-300">
            Выберите план, который подходит вашей команде, или запросите индивидуальную демонстрацию Workyy Canvas.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#030817]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className="p-6 rounded-2xl border border-white/10 bg-white/5 flex flex-col">
              <p className="text-xs uppercase text-brand-green tracking-[0.3em] mb-3">{plan.name}</p>
              <p className="text-4xl font-bold mb-4">{plan.price}</p>
              <p className="text-sm text-gray-300 mb-6">{plan.description}</p>
              <ul className="text-sm text-gray-200 space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <a
                href="/signup"
                className="mt-auto text-center px-4 py-2 rounded-md border border-white/20 hover:bg-white/10 transition"
              >
                Начать
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#07122b]/80 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase text-brand-green tracking-[0.3em] mb-3">Contact</p>
            <h2 className="text-3xl font-bold mb-4">Нужна демонстрация Workyy?</h2>
            <p className="text-gray-300 mb-6">
              Расскажите о задачах вашей команды, и мы подберём сценарий, покажем реальную канву и обсудим кастомные
              интеграции. Workyy = ваши данные, ваша история.
            </p>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Email: hello@workyy.app</li>
              <li>• Slack Connect по запросу</li>
              <li>• Демо доступно на русском и английском</li>
            </ul>
          </div>
          <form className="bg-[#010513] border border-white/10 rounded-2xl p-6 space-y-4">
            {['name', 'email', 'company'].map((field) => (
              <div key={field}>
                <label className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2 block">{field}</label>
                <input
                  name={field}
                  value={(form as any)[field]}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/15 rounded-md px-3 py-2 focus:border-brand-green outline-none"
                />
              </div>
            ))}
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2 block">message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-transparent border border-white/15 rounded-md px-3 py-2 focus:border-brand-green outline-none"
              />
            </div>
            <button
              type="button"
              className="w-full px-4 py-3 rounded-md bg-brand-green text-[#010513] font-semibold hover:bg-green-500 transition"
            >
              Contact for demo
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default PricingPage

