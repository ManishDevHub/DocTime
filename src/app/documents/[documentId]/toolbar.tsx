"use client"

import { useEditorStore } from '@/app/Store/use-editor-store';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { BoldIcon, ChevronDownIcon, HighlighterIcon, ItalicIcon,  LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, Section, SpellCheckIcon, UnderlineIcon, Undo2Icon } from 'lucide-react';

import React from 'react'
import { isActive } from '@tiptap/core';
import { Item } from '@radix-ui/react-accordion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { type Level } from "@tiptap/extension-heading";
import  TextStyle  from '@tiptap/extension-text-style'
import { type ColorResult, SketchPicker } from 'react-color';

const HighLightColorButton = () => {
  const  { editor} = useEditorStore();

  const value = editor?.getAttributes("highLight").color || "#000000";
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight( {color: color.hex }).run();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
        className=" h-7 min-w-7 shrink-0 flex items-center flex-col justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
<HighlighterIcon className='size-4' />
        </button>

      </DropdownMenuTrigger>
      
        <DropdownMenuContent className='p-0 z-[9999] bg-white shadow-md border rounded-md'>
          <SketchPicker 
          color={value}
          onChange={onChange}
          />

        </DropdownMenuContent>
    </DropdownMenu>
  )
}
const TextColorButton = () => {
  const  { editor} = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
        className=" h-7 min-w-7 shrink-0 flex items-center flex-col justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
<span className='text-xs'>A</span>
<div className='h-0.5 w-full' style={{ backgroundColor: value}}/>
        </button>

      </DropdownMenuTrigger>
      
        <DropdownMenuContent className='p-0 z-[9999] bg-white shadow-md border rounded-md'>
          <SketchPicker 
          color={value}
          onChange={onChange}
          />

        </DropdownMenuContent>
    </DropdownMenu>
  )
}

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: "Normal text", value: 0, fontSize: "16px" },
    { label: 'Heading 1', value: 1, fontSize: '32px' },
    { label: 'Heading 2', value: 2, fontSize: '24px' }, 
    { label: 'Heading 3', value: 3, fontSize: '20px' },
    { label: 'Heading 4', value: 4, fontSize: '18px' },
    { label: 'Heading 5', value: 5, fontSize: '16px' },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }

    return "Normal text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
        >
          <span className="truncate">
            {getCurrentHeading()}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0.2 flex flex-col gap-y-0.5 z-[9999] bg-white shadow-md border rounded-md">
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={value}
            style={{ fontSize }}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor?.chain().focus().toggleHeading({ level: value as Level }).run();
              }
            }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              (value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", { level: value }) && "bg-neutral-200/80"
            )}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?:boolean;
    icon: LucideIcon
}

const ToolbarButton = ({
     onClick,
   
    isActive,
    icon: Icon,
   
}: ToolbarButtonProps) => {

    return (
        <button
        onClick={onClick}
        className={cn(
            "text-sm h-7 min-w-7 flex  items-center justify-center rounded-sm hover:bg-neutral-200/80",
            isActive && "bg-neutral-200/80"
        )}
        >
            <Icon  className='size-4'/>
        </button>
    )
}

export default function Toolbar() {
const { editor } = useEditorStore();


const sections: {
    lable: string,
    icon: LucideIcon,
    onClick: () => void,
    isActive?: boolean,
} [] [] = [
    [
        {
            lable: "Undo",
            icon: Undo2Icon,
            onClick: () => editor?.chain().focus().undo().run(),
        },
         {
            lable: "Redu",
            icon: Redo2Icon,
            onClick: () => editor?.chain().focus().redo().run(),
        },
         {
            lable: "Print",
            icon: PrinterIcon,
            onClick: () => window.print(),
        },
         {
            lable: "SpellCheck",
            icon: SpellCheckIcon,
            onClick: () => {
                const current = editor?.view.dom.getAttribute("spellcheck");
                editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
            },
        },


    ],
    [
        {
            lable: "Bold",
            icon:  BoldIcon,
            isActive: editor?.isActive("bold"),
            onClick: () => editor?.chain().focus().toggleBold().run(),
             
        },
           {
            lable: "Italic",
            icon:  ItalicIcon,
            isActive: editor?.isActive("italic"),
            onClick: () => editor?.chain().focus().toggleItalic().run(),
             
        },
          {
            lable: "Underline",
            icon:  UnderlineIcon,
            isActive: editor?.isActive("underline"),
            onClick: () => editor?.chain().focus().toggleUnderline().run(),
             
        },
        

    ],
    [
        {
            lable: "Comment",
            icon: MessageSquarePlusIcon,
            onClick: () => console.log("TODO: Comment"),
            isActive: false, // Todo Enable this functionality
        },
         {
            lable: "Remove Formating",
            icon: RemoveFormattingIcon,
            onClick: () => editor?.chain().focus().unsetAllMarks().run(),
            isActive: editor?.isActive("taskList"),
        },
        
    ]
]

  return (
    <div className='bg-[#F1F4F9] PX-2.5 round-[24px] min-h-[40px] flex items-center
    gap-x-0.5 overflow-x-auto'>
        {
            sections[0].map((item) =>(
                <ToolbarButton key={item.lable} {...item} />
            )) } 

        <Separator orientation='vertical' className='h-6 bg-neutral-300' />
        {/* TODO : Font family */}
        <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <HeadingLevelButton />
        <Separator orientation='vertical' className='h-6 bg-neutral-300' />
        {/* TODO : Font Size */}
        <Separator orientation='vertical' className='h-6 bg-neutral-300' />
       {sections[1].map((item) => (
      <button
        key={item.lable}
        onClick={item.onClick}
        className={`p-2 rounded ${item.isActive ? "bg-gray-200" : ""}`}
      >
        <item.icon size={18} />
      </button>
    ))}
     <TextColorButton />
      <HighLightColorButton />
       <Separator orientation='vertical' className='h-6 bg-neutral-300' />
       {/* TODO :Link  */}
        {/* TODO :Image  */}
         {/* TODO :Aline */}
          {/* TODO :Line hight  */}
           {/* TODO :List */}
 {
            sections[2].map((item) =>(
                <ToolbarButton key={item.lable} {...item} />
            )) } 

        </div>
  )
}
