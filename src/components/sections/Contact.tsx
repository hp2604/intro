
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { Container } from '@/components/shared/Container';
import { useToast } from '@/hooks/use-toast';
import { personalInfo, contactMethods, socialLinks } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Send, MessageSquare } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function Contact() {
  const { toast } = useToast();
  const animation = useScrollAnimation<HTMLElement>();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactFormValues) {
    console.log('Form submitted:', data);

    try {
      const response = await fetch("https://formspree.io/f/mleqejva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        toast({
          title: 'Message Sent!',
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
      } else {
        throw new Error('Failed to send message.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'There was an error sending your message. Please try again later.',
        variant: 'destructive',
      });
    }

    form.reset();
  }

  return (
    <section 
      id="contact" 
      ref={animation.ref}
      className={cn('bg-background', animation.className)}
    >
      <Container>
        <SectionTitle>
           <MessageSquare className="inline-block mb-2 mr-2 h-8 w-8 text-accent" /> Get In Touch
        </SectionTitle>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card className="shadow-lg bg-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"  >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your message..." rows={5} {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="shadow-lg bg-card">
                <CardHeader>
                    <CardTitle className="text-2xl text-primary">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {contactMethods.map((method, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <method.icon className="h-6 w-6 text-accent" />
                        <Link href={method.href} className="text-foreground/90 hover:text-accent transition-colors">
                            {method.text}
                        </Link>
                    </div>
                    ))}
                </CardContent>
            </Card>
            <Card className="shadow-lg bg-card">
                <CardHeader>
                    <CardTitle className="text-2xl text-primary">Connect With Me</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-4">
                    {socialLinks.map((link) => (
                        <Link
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-accent transition-colors p-2 rounded-full hover:bg-accent/10"
                        aria-label={link.name}
                        >
                        <link.icon className="h-7 w-7" />
                        </Link>
                    ))}
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
